namespace AsoApi.Models.Requests
{
    public class CrearEventoRequest
    {
        public string Nombre { get; set; }
        public int IdUsuarioCreador { get; set; }
        public string Direccion { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        public IFormFile ImagenFile { get; set; }
    }
}