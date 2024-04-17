namespace AsoApi.Utils
{
    public class ImagenUtils
    {
        public static bool EsValidoElTamanoDeArchivo(long fileSize, long maxSize)
        {
            return fileSize <= maxSize;
        }

        public static bool EsExtensionDeArchivoValida(string fileExtension, string[] extensionesPermitidas)
        {
            return extensionesPermitidas.Contains(fileExtension);
        }

        public static async Task<byte[]> ConvertirArchivoABytes(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
