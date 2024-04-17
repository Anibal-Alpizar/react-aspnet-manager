using System.ComponentModel.DataAnnotations;

public class PasswordResetRequest
{
    [Required(ErrorMessage = "El email es obligatorio.")]
    public required string Email { get; set; }
}

public class ChangePasswordRequest
{
    [Required(ErrorMessage = "El email es obligatorio.")]
    public required string Email { get; set; }

    [Required(ErrorMessage = "El token de reseteo es obligatorio.")]
    public required string ResetToken { get; set; }

    [Required(ErrorMessage = "La nueva contraseña es obligatoria.")]
    public required string NewPassword { get; set; }
}
