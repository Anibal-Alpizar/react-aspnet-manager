namespace AsoApi.Middlewares
{
    public class SignOutMiddleware
    {
        private readonly RequestDelegate _next;

        public SignOutMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Path == "/api/Usuario/SignOut")
            {
                context.Response.Cookies.Delete("Authorization", new CookieOptions
                {
                    HttpOnly = true
                });

                context.Response.Cookies.Delete("Authorization");

                context.Response.StatusCode = 200;
                await context.Response.WriteAsync("Sesión cerrada exitosamente");
            }
            else
            {
                await _next(context);
            }
        }
    }

    public static class SignOutMiddlewareExtensions
    {
        public static IApplicationBuilder UseSignOutMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SignOutMiddleware>();
        }
    }
}
