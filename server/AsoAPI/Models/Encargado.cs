using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AsoApi.Models;

public partial class Encargado
{
    [Required(ErrorMessage = "El número de célula del encargado es obligatoria.")]
    [RegularExpression("^[0-9]*$", ErrorMessage = "El número de cédula solo puede contener dígitos.")]
    public int Id { get; set; }

    [Required(ErrorMessage = "El nombre del encargado es obligatorio.")]
    public required string Nombre { get; set; }

    [Required(ErrorMessage = "Los apellidos del encargado son obligatorios.")]
    public required string Apellidos { get; set; }

    [Required(ErrorMessage = "El teléfono del encargado es obligatorio.")]
    public required string Telefono { get; set; }

    [Required(ErrorMessage = "El correo electrónico del encargado es obligatorio.")]
    public required string Email { get; set; }

    [Required(ErrorMessage = "La clave del encargado es obligatoria.")]
    [DataType(DataType.Password)]
    public required string Clave { get; set; }

    [Required(ErrorMessage = "La justificación del encargado es obligatoria.")]
    public required string Justificacion { get; set; }

    public int IdRol { get; set; }

    public required bool Activo { get; set; }

    public virtual Rol? IdRolNavigation { get; set; }

}
