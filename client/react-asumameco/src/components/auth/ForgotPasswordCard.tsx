import { useState, useEffect } from "react";
import "./ForgotPasswordCard.css";
import { ForgotPasswordCardProps } from "../../interfaces/ui/forgotPasswordCardProps";
import { useAuth } from "../../hooks/useAuth";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ForgotPasswordCard: React.FC<ForgotPasswordCardProps> = ({
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const navigate = useNavigate();
  const {
    resetPassword,
    changePassword,
    errors: forgotErrors,
    isEmailValid,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEmailValid && currentStep === 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [isEmailValid, currentStep]);

  const handleNext = async (data: FieldValues) => {
    if (currentStep === 1) await resetPassword(data.email);
    else if (currentStep === 2) setCurrentStep(currentStep + 1);
    else if (currentStep === 3) {
      await changePassword(data.email, data.code, data.newPassword);
      if (forgotErrors.length === 0) {
        navigate("/auth");
        window.location.reload();
      }
    }
  };

  return (
    <div className="card-container">
      <span className="error-message">
        {forgotErrors.map((forgotErrors, index) => (
          <p key={index}>{forgotErrors}</p>
        ))}
      </span>
      <h2 className="text-xl font-bold mb-4">Restablecimiento de contraseña</h2>
      {errors.email && <span className="error-message">Correo Electronico requerido</span>}
      <ol className="space-y-4">
        {currentStep === 1 && (
          <li className="step">Paso 1: Digite su Correo electronico</li>
        )}
        {currentStep === 2 && (
          <li className="step">
            Paso 2: Ingresa el código de verificación enviado a tu correo electrónico
          </li>
        )}
        {currentStep === 3 && (
          <li className="step">
            Paso 3: Elija una nueva contraseña para su cuenta
          </li>
        )}
      </ol>
      <div className="button-container">
        <form onSubmit={handleSubmit(handleNext)}>
          {currentStep === 1 && (
            <>
              <input
                type="email"
                placeholder="Digite su Correo Electrónico"
                className="bg-gray-100 border-2 border-gray-200 p-2 rounded-md mb-4"
                {...register("email", {
                  required: "Correo electronico requerido",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "El valor ingresado no coincide con el formato de correo electrónico",
                  },
                })}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Seguir
              </button>
            </>
          )}
          {currentStep === 2 && (
            <>
              <input
                type="text"
                placeholder="Ingresa el código de verificación enviado a tu correo electrónico"
                {...register("code", {
                  required: "Se necesita un código de verificación",
                })}
                style={{
                  marginBottom: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "4px",
                  padding: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Seguir
              </button>
            </>
          )}
          {currentStep === 3 && (
            <>
              <input
                {...register("newPassword", {
                  required: "Se requiere nueva contraseña",
                })}
                type="password"
                placeholder="Introduzca su nueva contraseña"
                style={{
                  marginBottom: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "4px",
                  padding: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />

              <button
                type="submit"
                onClick={handleNext}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Restablecer la contraseña
              </button>
            </>
          )}
          <button
            onClick={onCancel}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordCard;
