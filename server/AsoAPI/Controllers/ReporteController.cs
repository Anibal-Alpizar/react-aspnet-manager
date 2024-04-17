using Microsoft.AspNetCore.Mvc;
using AsoApi.Models;
using System.Xml.Linq;
using System.Text;
using System.Xml.Xsl;
using System.Xml;

namespace AsoApi.Controllers
{
    public class ReporteController : ControllerBase
    {
        private readonly AsobdContext _context;

        public ReporteController(AsobdContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("api/reporte/usuarios")]
        public IActionResult GenerarReporteUsuarios()
        {
            try
            {
                var encargados = _context.Encargados.Count();
                var asociados = _context.Asociados.Count();

                var reporte = new XElement("ReporteUsuarios",
                                new XElement("Encargados",
                                    new XElement("Cantidad", encargados)),
                                new XElement("Asociados",
                                    new XElement("Cantidad", asociados)));

                var usuarios = new XElement("Usuarios");

                foreach (var encargado in _context.Encargados)
                {
                    usuarios.Add(new XElement("Encargado",
                                    new XElement("Id", encargado.Id),
                                    new XElement("Nombre", encargado.Nombre),
                                    new XElement("Apellidos", encargado.Apellidos),
                                    new XElement("Email", encargado.Email),
                                    new XElement("Rol", encargado.IdRol)));
                }

                foreach (var asociado in _context.Asociados)
                {
                    usuarios.Add(new XElement("Asociado",
                                    new XElement("Id", asociado.Id),
                                    new XElement("Nombre", asociado.Nombre),
                                    new XElement("Apellidos", asociado.Apellidos),
                                    new XElement("Email", asociado.Email)));
                }

                reporte.Add(usuarios);

                var xmlBytes = Encoding.UTF8.GetBytes(reporte.ToString());

                var xsltFilePath = "./XSLT/estilos_reporte_usuarios.xslt";
                var xslt = new XslCompiledTransform();
                xslt.Load(xsltFilePath);

                using (var ms = new MemoryStream())
                {
                    using (var xmlReader = XmlReader.Create(new MemoryStream(xmlBytes)))
                    {
                        using (var xmlWriter = XmlWriter.Create(ms))
                        {
                            xslt.Transform(xmlReader, null, xmlWriter);
                            ms.Seek(0, SeekOrigin.Begin);
                            var transformedXmlBytes = ms.ToArray();
                            return File(transformedXmlBytes, "application/xml", "reporte_usuarios.html");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Se produjo un error al generar el reporte de usuarios: {ex.Message}");
            }
        }


        [HttpGet]
        [Route("api/reporte/eventos")]
        public IActionResult GenerarReporteEventos()
        {
            try
            {
                var eventos = _context.Eventos.ToList();
                var reporte = new XElement("ReporteEventos");

                foreach (var evento in eventos)
                {
                    var participantes = _context.EventoAsociados
                        .Where(ea => ea.IdEvento == evento.Id)
                        .Join(_context.Asociados,
                            ea => ea.IdAsociado,
                            a => a.Id,
                            (ea, a) => new
                            {
                                a.Id,
                                a.Nombre,
                                a.Apellidos,
                                a.Email
                            })
                        .ToList();

                    var eventoElement = new XElement("Evento",
                                            new XElement("Id", evento.Id),
                                            new XElement("Nombre", evento.Nombre),
                                            new XElement("Direccion", evento.Direccion),
                                            new XElement("Fecha", evento.Fecha),
                                            new XElement("Descripcion", evento.Descripcion),
                                            new XElement("Participantes", participantes.Select(p =>
                                                new XElement("Asociado",
                                                    new XElement("Id", p.Id),
                                                    new XElement("Nombre", p.Nombre),
                                                    new XElement("Apellidos", p.Apellidos),
                                                    new XElement("Email", p.Email)
                                                )
                                            ))
                                        );

                    reporte.Add(eventoElement);
                }

                var xmlBytes = Encoding.UTF8.GetBytes(reporte.ToString());

                var xsltFilePath = "./XSLT/estilos_reporte_eventos.xslt";
                var xslt = new XslCompiledTransform();
                xslt.Load(xsltFilePath);

                using (var ms = new MemoryStream())
                {
                    using (var xmlReader = XmlReader.Create(new MemoryStream(xmlBytes)))
                    {
                        using (var xmlWriter = XmlWriter.Create(ms))
                        {
                            xslt.Transform(xmlReader, null, xmlWriter);
                            ms.Seek(0, SeekOrigin.Begin);
                            var transformedXmlBytes = ms.ToArray();
                            return File(transformedXmlBytes, "application/xml", "reporte_eventos.html");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Se produjo un error al generar el reporte de eventos: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("api/calendario/eventos")]
        public IActionResult GenerarCalendarioEventos()
        {
            try
            {
                var eventos = _context.Eventos.ToList();

                var calendario = new XElement("Calendario",
                                eventos.Select(e => new XElement("Evento",
                                    new XElement("Id", e.Id),
                                    new XElement("Nombre", e.Nombre),
                                    new XElement("Fecha", e.Fecha.ToString("yyyy-MM-dd")),
                                    new XElement("Descripcion", e.Descripcion)
                                )));

                var xmlBytes = Encoding.UTF8.GetBytes(calendario.ToString());

                var xsltFilePath = "./XSLT/estilos_calendario_eventos.xslt";
                var xslt = new XslCompiledTransform();
                xslt.Load(xsltFilePath);

                using (var ms = new MemoryStream())
                {
                    using (var xmlReader = XmlReader.Create(new MemoryStream(xmlBytes)))
                    {
                        using (var xmlWriter = XmlWriter.Create(ms))
                        {
                            xslt.Transform(xmlReader, null, xmlWriter);
                            ms.Seek(0, SeekOrigin.Begin);
                            var transformedXmlBytes = ms.ToArray();
                            return File(transformedXmlBytes, "text/html", "calendario_eventos.html");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Se produjo un error al generar el calendario de eventos: {ex.Message}");
            }
        }
    }
}
