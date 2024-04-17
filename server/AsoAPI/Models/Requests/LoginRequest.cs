using System.ComponentModel.DataAnnotations;

namespace AsoApi.Models.Requests
{

    public class LoginRequest
    {
        [Required(ErrorMessage = "El número de cédula es obligatorio.")]
        public required string Id { get; set; }

        [Required(ErrorMessage = "La clave es obligatoria.")]
        public required string Clave { get; set; }
    }
}
