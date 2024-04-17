import { MdFamilyRestroom } from "react-icons/md";
import { TextInput, CustomButton } from "../../components/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Logo } from "../../assets/auth";
import { BsEyeFill, BsEyeSlashFill, BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { useAuth } from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/redux/rootState";
import { ThemeAction, setTheme } from "../../redux/slice/theme/theme";
import { Dispatch } from "@reduxjs/toolkit";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { useEffect, useState } from "react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch: Dispatch<ThemeAction> = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { preRegister, errors: preRegisterErrors } = useAuth();

  // !TODO: Add type for data
  const onsubmit = handleSubmit(async (data: any) => {
    const res = await preRegister(data);

    if (res) {
      preRegisterErrors.length = 0;
      toast.success(res.message);
      toast.info(
        "Tu cuenta está inactiva. El administrador deberá aprobar tu solicitud antes de que puedas acceder al sistema."
      );
      reset();
    }
  });

  useEffect(() => {
    if (preRegisterErrors.length > 0) toast.error(preRegisterErrors.join("\n"));
  }, [preRegisterErrors]);

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";
    dispatch(setTheme(themeValue));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
        <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex  flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl">
          {/* left */}
          <div className="w-full lg:w-1/2 h-full p-10 lg:p-20 flex flex-col justify-center">
            <div className="w-full flex gap-2 items-center mb-6">
              <div className="p-2 bg-[#07305d] rounded text-white">
                <MdFamilyRestroom />
              </div>
              <span className="text-2xl text-[#07305d] font-semibold">
                Asomameco
              </span>
            </div>
            <p className="text-ascent-1 text-base font-semibold">
              Haz el pre-registro
            </p>
            <form className="py-8 flex flex-col gap-5" onSubmit={onsubmit}>
              <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
                <TextInput
                  name="cedula"
                  placeholder="Cédula"
                  label="Cédula"
                  type="text"
                  styles="w-full"
                  register={register("id", {
                    required: "La cédula es requerida",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "La cédula debe ser un número",
                    },
                  })}
                  error={errors.cedula ? errors.cedula.message : ""}
                />
                <TextInput
                  name="nombre"
                  placeholder="Nombre"
                  label="Nombre"
                  type="text"
                  styles="w-full"
                  register={register("nombre", {
                    required: "El nombre es requerido",
                  })}
                  error={errors.nombre ? errors.nombre.message : ""}
                />

                <TextInput
                  name="apellidos"
                  placeholder="Apellidos"
                  label="Apellidos"
                  type="text"
                  register={register("apellidos", {
                    required: "Los apellidos son requeridos",
                  })}
                  styles="w-full"
                  error={errors.apellidos ? errors.apellidos.message : ""}
                />
              </div>

              <TextInput
                name="email"
                placeholder="Correo electrónico"
                label="Correo electrónico"
                type="email"
                register={register("email", {
                  required: "El correo es requerido",
                })}
                styles="w-full"
                error={errors.email ? errors.email.message : ""}
              />
              <div className="relative">
                <TextInput
                  name="password"
                  placeholder="Contraseña"
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  register={register("clave", {
                    required: "La contraseña es requerida",
                  })}
                  styles="w-full"
                  error={errors.password ? errors.password.message : ""}
                />

                <button
                  type="button"
                  className="absolute bottom-2 transform -translate-y-1/2 right-5"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                </button>
              </div>

              <TextInput
                name="justificacion"
                placeholder="¿Por qué quieres ser parte de ASOMAMECO?"
                label="Justificación"
                type="text"
                register={register("justificacion", {
                  required: "La justificación es requerida",
                })}
                styles="w-full"
                error={errors.justificacion ? errors.justificacion.message : ""}
              />

              <TextInput
                name="telefono"
                placeholder="Teléfono"
                label="Teléfono"
                type="text"
                register={register("telefono", {
                  required: "El teléfono es requerido",
                })}
                styles="w-full rounded-md"
                error={errors.telefono ? errors.telefono.message : ""}
              />

              <CustomButton
                type="submit"
                containerStyles={`inline-flex justify-center rounded-md bg-[#e4872c] px-8 py-3 text-sm font-medium text-white outline-none`}
                title="Pre-Registrarse"
              />
            </form>
            <p className="text-ascent-2 text-sm text-center">
              ¿Ya tienes una cuenta?
              <Link
                to="/auth"
                className="text-[#07305d] font-semibold ml-2 cursor-pointer"
              >
                Inicia sesión
              </Link>
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <p>
                <Link
                  to="/"
                  className="text-[#0b488c] font-semibold ml-2 cursor-pointer"
                >
                  Ir a Home
                </Link>
                <span className="font-extrabold"> | </span>
              </p>
              <button onClick={() => handleTheme()}>
                {theme ? <BsMoon /> : <BsSunFill />}
              </button>
            </div>
          </div>
          {/*  right */}
          <div className="w-full lg:w-1/2 h-full lg:flex flex-col items-center justify-center bg-[#07305d] hidden">
            <div className="relative w-full flex items-center justify-center">
              <img
                src={Logo}
                alt="convenios"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover object-center"
              />
              <div className="absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full">
                <BsShare size={14} />
                <span className="text-sm font-medium">Comparte</span>
              </div>

              <div className="absolute flex items-center gap-1 bg-white left-10 top-10 py-2 px-5 rounded-full">
                <ImConnection />
                <span className="text-sm font-medium">Conéctate</span>
              </div>

              <div className="absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full">
                <AiOutlineInteraction />
                <span className="text-sm font-medium">Interactúa</span>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-white text-base">ASUMAMECO</p>
              <span className="text-sm text-white/80">
                Asociación de Maridos a Mecate Corto
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
