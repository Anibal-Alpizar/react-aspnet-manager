using System.ComponentModel.DataAnnotations;

namespace AsoApi.Models.DTO
{
    public class EncargadoDTO
    {
        //[Required(ErrorMessage = "El número de célula del encargado es obligatorio.")]
        //[RegularExpression("^[0-9]*$", ErrorMessage = "El número de cédula solo puede contener dígitos.")]
        public required int Id { get; set; }

       // [Required(ErrorMessage = "El nombre del encargado es obligatorio.")]
        public required string Nombre { get; set; }

        //[Required(ErrorMessage = "Los apellidos del encargado son obligatorios.")]
        public required string Apellidos { get; set; }

        //[Required(ErrorMessage = "El teléfono del encargado es obligatorio.")]
        public required string Telefono { get; set; }

        //[Required(ErrorMessage = "El correo electrónico del encargado es obligatorio.")]
        //[EmailAddress(ErrorMessage = "El correo electrónico no tiene un formato válido.")]
        public required string Email { get; set; }

       // [Required(ErrorMessage = "La clave del encargado es obligatoria.")]
        [DataType(DataType.Password)]
        public required string Clave { get; set; }
    }
}
