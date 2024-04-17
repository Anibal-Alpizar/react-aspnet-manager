using System;
using System.ComponentModel.DataAnnotations;

namespace AsoApi.Models;

public partial class Evento
{
    public int Id { get; set; }

    [Required(ErrorMessage = "El ID del usuario creador es obligatorio.")]
    public int IdUsuarioCreador { get; set; }

    [Required(ErrorMessage = "El nombre del evento es obligatorio.")]
    public required string Nombre { get; set; }

    [Required(ErrorMessage = "La dirección del evento es obligatoria.")]
    public required string Direccion { get; set; }

    [Required(ErrorMessage = "La fecha del evento es obligatoria.")]
    [DataType(DataType.Date)]
    public DateTime Fecha { get; set; }

    public DateTime FechaCreacion { get; set; }

    [Required(ErrorMessage = "La descripción del evento es obligatoria.")]
    public required string Descripcion { get; set; }

    [Required(ErrorMessage = "La imagen del evento es obligatoria.")]
    public byte[]? Imagen { get; set; }

    public virtual ICollection<EventoAsociado> EventoAsociados { get; } = new List<EventoAsociado>();

}
