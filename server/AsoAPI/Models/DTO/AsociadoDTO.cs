using System.ComponentModel.DataAnnotations;

namespace AsoApi.Models.DTO
{
    public class AsociadoDTO
    {
        [Required(ErrorMessage = "El número de cédula del asociado es obligatorio.")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "El número de cédula solo puede contener dígitos.")]
        public required int Id { get; set; }

        [Required(ErrorMessage = "El nombre del asociado es obligatorio.")]
        public required string Nombre { get; set; }

        [Required(ErrorMessage = "Los apellidos del asociado son obligatorios.")]
        public required string Apellidos { get; set; }

        [Required(ErrorMessage = "El teléfono del asociado es obligatorio.")]
        public required string Telefono { get; set; }

        [Required(ErrorMessage = "El correo electrónico del asociado es obligatorio.")]
        [EmailAddress(ErrorMessage = "El correo electrónico no tiene un formato válido.")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "La clave del asociado es obligatoria.")]
        public required string Clave { get; set; }

    }
}
