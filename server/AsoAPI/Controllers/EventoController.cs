using AsoApi.Models;
using AsoApi.Models.Requests;
using AsoApi.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlTypes;

namespace AsoApi.Controllers
{
    [Route("api/[controller]")]

    public class EventoController : ControllerBase
    {
        private readonly AsobdContext _context;
        private readonly Random _random;

        public EventoController(AsobdContext context, Random random)
        {
            _context = context;
            _random = random;
        }

        [HttpGet]
        [Route("GetEventos")]
        public IActionResult GetEventos()
        {
            try
            {
                var eventosConParticipantes = _context.Eventos
                    .Select(e => new
                    {
                        e.Id,
                        e.IdUsuarioCreador,
                        e.Nombre,
                        e.Direccion,
                        e.Fecha,
                        e.FechaCreacion,
                        e.Descripcion,
                        e.Imagen,
                        UsuarioCreador = _context.Encargados
                            .Where(u => u.Id == e.IdUsuarioCreador)
                            .Select(u => new
                            {
                                Id = u.Id,
                                Nombre = u.Nombre,
                                Apellidos = u.Apellidos
                            })
                            .FirstOrDefault(),
                        Participantes = _context.EventoAsociados
                            .Where(ea => ea.IdEvento == e.Id)
                            .Join(_context.Asociados,
                                ea => ea.IdAsociado,
                                a => a.Id,
                                (ea, a) => new
                                {
                                    Id = a.Id,
                                    Nombre = a.Nombre,
                                    Apellidos = a.Apellidos
                                })
                            .ToList()
                    })
                    .ToList();

                return Ok(eventosConParticipantes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Se produjo un error al recuperar los eventos. Por favor, inténtelo de nuevo más tarde.");
            }
        }


        [HttpPost]
        [Route("CrearEvento")]
        public async Task<IActionResult> CrearEvento([FromForm] CrearEventoRequest request)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                if (request.ImagenFile == null || request.ImagenFile.Length == 0) return BadRequest("Por favor, seleccione una imagen.");

                string fileExtension = Path.GetExtension(request.ImagenFile.FileName).ToLower();
                string[] extensionesPermitidas = { ".jpg", ".jpeg", ".png" };
                if (!ImagenUtils.EsExtensionDeArchivoValida(fileExtension, extensionesPermitidas)) return BadRequest("Solo se permiten archivos JPEG o PNG.");

                if (request.Fecha < DateTime.Today) return BadRequest("La fecha del evento no puede ser anterior a la fecha actual.");

                if (request.Descripcion.Length > 255) return BadRequest("La descripción del evento debe tener menos de 255 caracteres.");


                var evento = new Evento
                {
                    Id = _random.Next(1, 1000000),
                    IdUsuarioCreador = request.IdUsuarioCreador,
                    Nombre = request.Nombre,
                    Direccion = request.Direccion,
                    Fecha = request.Fecha,
                    Descripcion = request.Descripcion,
                    FechaCreacion = DateTime.Now
                };

                evento.Imagen = await ImagenUtils.ConvertirArchivoABytes(request.ImagenFile);

                _context.Eventos.Add(evento);

                await _context.SaveChangesAsync();

                return Ok(new { message = "Evento creado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Se produjo un error al crear el evento. Por favor, inténtelo de nuevo más tarde. {ex}");
            }
        }


        [HttpPost]
        [Route("ConfirmarAsistencia")]
        public async Task<IActionResult> ConfirmarAsistencia([FromBody] ConfirmarAsistenciaRequest request)
        {
            try
            {
                var eventoExistente = await _context.Eventos.FindAsync(request.IdEvento);
                if (eventoExistente == null) return BadRequest("El evento proporcionado no existe.");

                var eventoAsociadoExistente = await _context.EventoAsociados
                    .FirstOrDefaultAsync(e => e.IdEvento == request.IdEvento && e.IdAsociado == request.IdAsociado);

                if (eventoAsociadoExistente != null)
                {
                    _context.EventoAsociados.Remove(eventoAsociadoExistente);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = "Asistencia removida exitosamente" });
                }
                else
                {
                    var asociado = await _context.Asociados.FindAsync(request.IdAsociado);
                    if (asociado == null) return BadRequest("El asociado proporcionado no existe.");

                    var eventoAsociado = new EventoAsociado
                    {
                        IdEvento = request.IdEvento,
                        IdAsociado = request.IdAsociado
                    };

                    _context.EventoAsociados.Add(eventoAsociado);
                    await _context.SaveChangesAsync();

                    return Ok(new { message = "Asistencia confirmada exitosamente" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Se produjo un error al confirmar la asistencia. Por favor, inténtelo de nuevo más tarde. {ex}");
            }
        }

        [HttpDelete]
        [Route("BorrarEvento/{idEvento}")]
        public async Task<IActionResult> BorrarEvento(int idEvento)
        {
            try
            {
                var eventoExistente = await _context.Eventos.FindAsync(idEvento);
                if (eventoExistente == null) return BadRequest("El evento proporcionado no existe.");

                _context.Eventos.Remove(eventoExistente);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Evento eliminado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Se produjo un error al eliminar el evento. Por favor, inténtelo de nuevo más tarde. {ex}");
            }
        }

        [HttpGet]
        [Route("GetAsistencias/{idEvento}")]
        public IActionResult GetAsistencias(int idEvento)
        {
            try
            {
                var asistencias = _context.EventoAsociados
                    .Where(ea => ea.IdEvento == idEvento)
                    .Join(_context.Asociados,
                                           ea => ea.IdAsociado,
                                           a => a.Id,
                                           (ea, a) => new
                                                            {
                                                               Id = a.Id,
                                                               Nombre = a.Nombre,
                                                               Apellidos = a.Apellidos
                                                            })
                    .ToList();

                return Ok(asistencias);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Se produjo un error al recuperar las asistencias. Por favor, inténtelo de nuevo más tarde.");
            }
        }

    }
}
