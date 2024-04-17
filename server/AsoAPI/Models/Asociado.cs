using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AsoApi.Models;

public partial class Asociado
{
    [Required(ErrorMessage = "El número de célula del asociado es obligatoria.")]
    [RegularExpression("^[0-9]*$", ErrorMessage = "El número de cédula solo puede contener dígitos.")]
    public required int Id { get; set; }

    [Required(ErrorMessage = "El nombre del asociado es obligatorio.")]
    public required string Nombre { get; set; }

    [Required(ErrorMessage = "Los apellidos del asociado son obligatorios.")]
    public required string Apellidos { get; set; }

    [Required(ErrorMessage = "El teléfono del asociado es obligatorio.")]
    public required string Telefono { get; set; }

    [Required(ErrorMessage = "El correo electrónico del asociado es obligatorio.")]
    public required string Email { get; set; }

    [Required(ErrorMessage = "La clave del asociado es obligatoria.")]
    public required string Clave { get; set; }

    [Required(ErrorMessage = "El estado del asociado es obligatorio.")]
    public required bool Estado { get; set; }

    public virtual ICollection<EventoAsociado> EventoAsociados { get; } = new List<EventoAsociado>();
}
