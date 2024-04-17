using AsoApi.Models;
using AsoApi.Services;
using AsoApi.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Net.Mail;
using System.Net;
using AsoApi.Models.DTO;
using AsoApi.Models.Requests;

namespace AsoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly AsobdContext _context;
        private readonly JwtService _jwtService;
        private readonly EmailService _emailService;

        public UsuarioController(AsobdContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
            _emailService = new EmailService();
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<object>> Login([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Id) || string.IsNullOrEmpty(loginRequest.Clave))
                return BadRequest("Se requieren el número de cédula y la clave para iniciar sesión.");

            int id;
            if (!int.TryParse(loginRequest.Id, out id))
                return BadRequest("El formato del número de cédula no es válido.");

            var encargadoExistente = await _context.Encargados.FirstOrDefaultAsync(x => x.Id == id);
            if (encargadoExistente != null)
            {

                string claveEncriptada = Utilitarios.ConvertirSha256(loginRequest.Clave);
                var encargadoLogin = await _context.Encargados.FirstOrDefaultAsync(x => x.Id == id && x.Clave == claveEncriptada);
                if (encargadoLogin == null)
                    return BadRequest("Contraseña incorrecta");
                if (!encargadoExistente.Activo)
                    return BadRequest("Usuario inactivo");

                var token = _jwtService.GenerateJwtToken(encargadoLogin);

                return new
                {
                    Token = token,
                    encargadoLogin.Id,
                    encargadoLogin.Nombre,
                    encargadoLogin.Apellidos,
                    encargadoLogin.Email,
                    encargadoLogin.IdRol,
                    encargadoLogin.IdRolNavigation
                };
            }
            else
            {

                var asociadoExistente = await _context.Asociados.FirstOrDefaultAsync(x => x.Id == id);
                if (asociadoExistente == null)
                    return NotFound("Usuario no encontrado");

                if (asociadoExistente.Clave != Utilitarios.ConvertirSha256(loginRequest.Clave))
                    return BadRequest("Contraseña incorrecta");

                if (!asociadoExistente.Estado)
                    return BadRequest("Usuario inactivo");

                var token = _jwtService.GenerateJwtToken(asociadoExistente);

                return new
                {
                    Token = token,
                    asociadoExistente.Id,
                    asociadoExistente.Nombre,
                    asociadoExistente.Apellidos,
                    asociadoExistente.Email
                };
            }
        }

        [Authorize]
        [HttpGet("InformacionUsuario")]
        public IActionResult InformacionUsuario()
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

            var encargado = _context.Encargados.FirstOrDefault(x => x.Id == int.Parse(userId));

            if (encargado != null)
            {
                var usuarioResponse = new
                {
                    encargado.Id,
                    encargado.Nombre,
                    encargado.Apellidos,
                    encargado.Email,
                    encargado.IdRol,
                    encargado.IdRolNavigation
                };

                return Ok(usuarioResponse);
            }
            else
            {
                var asociado = _context.Asociados.FirstOrDefault(x => x.Id == int.Parse(userId));

                if (asociado != null)
                {
                    var usuarioResponse = new
                    {
                        asociado.Id,
                        asociado.Nombre,
                        asociado.Apellidos,
                        asociado.Email,
                        IdRol = "",
                        IdRolNavigation = "" 
                    };

                    return Ok(usuarioResponse);
                }
                else
                {
                    return NotFound("Usuario no encontrado");
                }
            }
        }

        [Authorize]
        [HttpPost("SignOut")]
        public IActionResult SignOut()
        {
            return Ok(new { message = "Sesión cerrada exitosamente" });
        }

        [HttpPost("Preregistration")]
        public async Task<IActionResult> SendPreregistration([FromBody] Preregistro preregistro)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var encargado = new Encargado
                {
                    Id = preregistro.Id,
                    Nombre = preregistro.Nombre,
                    Telefono = preregistro.Telefono,
                    Email = preregistro.Email,
                    Apellidos = preregistro.Apellidos,
                    Clave = Utilitarios.ConvertirSha256(preregistro.Clave),
                    IdRol = 2,
                    Justificacion = preregistro.Justificacion,
                    Activo = false,
                };

                if (preregistro.Id.ToString().Length != 9) return BadRequest("El número de cédula debe tener 9 dígitos");

                if (await _context.Encargados.AnyAsync(x => x.Id == encargado.Id)) return BadRequest("El número de cédula ya está registrado");

                if (await _context.Encargados.AnyAsync(x => x.Email == encargado.Email)) return BadRequest("El correo electrónico ya está registrado");

                _context.Encargados.Add(encargado);
                await _context.SaveChangesAsync();

                string body = $@"
                            <h2>Nueva Preinscripción en Asomameco</h2>
                            <p><strong>Nombre:</strong> {preregistro.Nombre}</p>
                            <p><strong>Apellidos:</strong> {preregistro.Apellidos}</p>
                            <p><strong>Email:</strong> {preregistro.Email}</p>
                            <p><strong>Justificación:</strong> {preregistro.Justificacion}</p>
                            <p><strong>Teléfono:</strong> {preregistro.Telefono}</p>
                            ";
                _emailService.SendEmail("Nueva Preinscripción", body, "anibal.alpizar14@gmail.com");

                return Ok(new { message = "Preregistro realizado correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al enviar el formulario: {ex}");
            }
        }

        [HttpPost("ResetPassword")]
        public IActionResult ResetPassword([FromBody] string email)
        {
            var user = _context.Encargados.FirstOrDefault(x => x.Email == email);

            if (user == null) return NotFound("Usuario no encontrado");

            var resetToken = _jwtService.GenerateJwtToken(user);

            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("asomamecoo@gmail.com", "jusp nrgz pcgn vwdc"),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("asomamecoo@gmail.com"),
                    Subject = "Restablecimiento de Contraseña",
                    Body = $"Tu token de restablecimiento de contraseña: {resetToken}",
                    IsBodyHtml = false,
                };

                mailMessage.To.Add(user.Email);

                smtpClient.Send(mailMessage);

                return Ok(new { message = "Token de restablecimiento enviado exitosamente" });
            }
            catch (SmtpException ex)
            {
                return StatusCode(500, $"Error al enviar el correo electrónico: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error inesperado: {ex.Message}");
            }
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest changePasswordRequest)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var validatedToken = _jwtService.ValidateJwtToken(changePasswordRequest.ResetToken);

                if (validatedToken == null) return BadRequest("Token inválido o expirado");

                var user = await _context.Encargados.FirstOrDefaultAsync(x => x.Email == changePasswordRequest.Email);

                if (user == null) return BadRequest("Usuario no encontrado");

                user.Clave = Utilitarios.ConvertirSha256(changePasswordRequest.NewPassword);

                await _context.SaveChangesAsync();

                return Ok(new { message = "Contraseña cambiada exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error inesperado: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("Usuarios")]
        public IActionResult GetUsuarios()
        {
            try
            {
                var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
                var usuario = _context.Encargados.FirstOrDefault(x => x.Id == int.Parse(userId));

                if (usuario.IdRol == 1)
                {
                    var encargados = _context.Encargados.Where(e => e.IdRol == 2).ToList();
                    var asociados = _context.Asociados.ToList();

                    var result = new { Encargados = encargados, Asociados = asociados };
                    return Ok(result);
                }
                else if (usuario.IdRol == 2)
                {
                    var asociados = _context.Asociados.ToList();
                    var result = new { Asociados = asociados };
                    return Ok(result);
                }
                else
                {
                    return Unauthorized("No tienes permisos para realizar esta acción");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener los encargados: {ex.Message}");
            }
        }

        //[Authorize]
        [HttpPost("CrearAsociado")]
        public async Task<IActionResult> CrearAsociado([FromBody] AsociadoDTO asociadoDTO)
        {
            try
            {
                //if (!ModelState.IsValid) return BadRequest(ModelState);

                if (asociadoDTO.Id.ToString().Length != 9) return BadRequest("El número de cédula debe tener 9 dígitos");

                if (await _context.Asociados.AnyAsync(x => x.Id == asociadoDTO.Id)) return BadRequest("El número de cédula ya está registrado");

                if (await _context.Asociados.AnyAsync(x => x.Email == asociadoDTO.Email)) return BadRequest("El correo electrónico ya está registrado");

                var asociado = new Asociado
                {
                    Id = asociadoDTO.Id,
                    Nombre = asociadoDTO.Nombre,
                    Apellidos = asociadoDTO.Apellidos,
                    Telefono = asociadoDTO.Telefono,
                    Email = asociadoDTO.Email,
                    Clave = Utilitarios.ConvertirSha256(asociadoDTO.Clave),
                    Estado = true,
                };

                _context.Asociados.Add(asociado);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Asociado creado exitosamente" });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error al crear el asociado: {ex.InnerException?.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error inesperado al crear el asociado: {ex.Message}");
            }
        }

        [HttpPost("CrearEncargado")]
        public async Task<IActionResult> CrearEncargado([FromBody] EncargadoDTO encargadoDTO)
        {
            try
            {
                if (encargadoDTO.Id.ToString().Length != 9) return BadRequest("El número de cédula debe tener 9 dígitos.");

                if (await _context.Encargados.AnyAsync(x => x.Id == encargadoDTO.Id)) return BadRequest("El número de cédula ya está registrado.");

                if (await _context.Encargados.AnyAsync(x => x.Email == encargadoDTO.Email)) return BadRequest("El correo electrónico ya está registrado.");

                var encargado = new Encargado
                {
                    Id = encargadoDTO.Id,
                    Nombre = encargadoDTO.Nombre,
                    Apellidos = encargadoDTO.Apellidos,
                    Telefono = encargadoDTO.Telefono,
                    Email = encargadoDTO.Email,
                    Clave = Utilitarios.ConvertirSha256(encargadoDTO.Clave),
                    Activo = true,
                    IdRol = 2, // 2=encargado
                    Justificacion = "Usuario creado por un administrador."
                };

                _context.Encargados.Add(encargado);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Encargado creado exitosamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error inesperado al crear el encargado: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPost("CambiarEstadoAsociado/{id}")]
        public async Task<IActionResult> CambiarEstadoAsociado(int id, [FromBody] bool activar)
        {
            try
            {
                var usuario = await _context.Asociados.FirstOrDefaultAsync(x => x.Id == id);

                if (usuario == null) return NotFound("Asociado no encontrado");

                usuario.Estado = activar;
                await _context.SaveChangesAsync();

                if (activar) return Ok(new { message = "Asociado activado exitosamente" });

                else return Ok(new { message = "Asociado desactivado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error inesperado al cambiar el estado del usuario: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPost("CambiarEstadoEncargado/{id}")]
        public async Task<IActionResult> CambiarEstadoEncargado(int id, [FromBody] bool activar)
        {
            try
            {
                var usuario = await _context.Encargados.FirstOrDefaultAsync(x => x.Id == id);

                if (usuario == null) return NotFound("Encargado no encontrado");

                usuario.Activo = activar;
                await _context.SaveChangesAsync();

                if (activar) return Ok(new { message = "Encargado activado exitosamente" });

                else return Ok(new { message = "Encargado desactivado exitosamente" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error inesperado al cambiar el estado del usuario: {ex.Message}");
            }
        }

        [HttpPost("ActualizarUsuario/{id}")]
        public async Task<IActionResult> ActualizarUsuario(int id, [FromBody] ActualizarUsuarioRequest actualizarUsuarioRequest)
        {
            try
            {
                var usuarioEncargado = await _context.Encargados.FirstOrDefaultAsync(x => x.Id == id);
                var usuarioAsociado = await _context.Asociados.FirstOrDefaultAsync(x => x.Id == id);

                if (usuarioEncargado == null && usuarioAsociado == null)
                    return NotFound("Usuario no encontrado");

                if (!string.IsNullOrEmpty(actualizarUsuarioRequest.Nombre))
                {
                    if (usuarioEncargado != null)
                        usuarioEncargado.Nombre = actualizarUsuarioRequest.Nombre;
                    else
                        usuarioAsociado.Nombre = actualizarUsuarioRequest.Nombre;
                }

                if (!string.IsNullOrEmpty(actualizarUsuarioRequest.Apellidos))
                {
                    if (usuarioEncargado != null)
                        usuarioEncargado.Apellidos = actualizarUsuarioRequest.Apellidos;
                    else
                        usuarioAsociado.Apellidos = actualizarUsuarioRequest.Apellidos;
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "Usuario actualizado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error inesperado al actualizar el usuario: {ex.Message}");
            }
        }

        [HttpDelete("EliminarAsociado/{id}")]
        public async Task<IActionResult> EliminarAsociado(int id)
        {
            try
            {
                var usuario = await _context.Asociados.FirstOrDefaultAsync(x => x.Id == id);

                if (usuario == null) return NotFound("Asociado no encontrado");

                _context.Asociados.Remove(usuario);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Asociado eliminado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error inesperado al eliminar el asociado: {ex.Message}");
            }
        }

        [HttpDelete("EliminarEncargado/{id}")]
        public async Task<IActionResult> EliminarEncargado(int id)
        {
            try
            {
                var usuario = await _context.Encargados.FirstOrDefaultAsync(x => x.Id == id);

                if (usuario == null) return NotFound("Encargado no encontrado");

                _context.Encargados.Remove(usuario);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Encargado eliminado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error inesperado al eliminar el encargado: {ex.Message}");
            }
        }
    }
}
