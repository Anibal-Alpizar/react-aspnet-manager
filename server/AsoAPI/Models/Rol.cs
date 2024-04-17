using System;
using System.Collections.Generic;

namespace AsoApi.Models;

public partial class Rol
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public virtual ICollection<Encargado> Encargados { get; } = new List<Encargado>();
}
