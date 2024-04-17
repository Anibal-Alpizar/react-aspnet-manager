using System.ComponentModel.DataAnnotations;

namespace AsoApi.Models.DTO
{
    public class Preregistro
    {
        [Required(ErrorMessage = "El número de cédula es obligatorio.")]
        public required int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio.")]
        public required string Nombre { get; set; }

        [Required(ErrorMessage = "Los apellidos son obligatorios.")]
        public required string Apellidos { get; set; }

        [Required(ErrorMessage = "El correo electrónico es obligatorio.")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "La clave es obligatoria.")]
        public required string Clave { get; set; }

        [Required(ErrorMessage = "La justificación es obligatoria.")]
        public required string Justificacion { get; set; }

        [Required(ErrorMessage = "El teléfono es obligatorio.")]
        public required string Telefono { get; set; }
    }
}