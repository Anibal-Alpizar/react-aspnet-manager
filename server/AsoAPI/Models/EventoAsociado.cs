using System;
using System.Collections.Generic;

namespace AsoApi.Models;

public partial class EventoAsociado
{
    public int IdEvento { get; set; }

    public int IdAsociado { get; set; }

    public virtual Evento IdAsociado1 { get; set; } = null!;

    public virtual Asociado IdAsociadoNavigation { get; set; } = null!;
}
