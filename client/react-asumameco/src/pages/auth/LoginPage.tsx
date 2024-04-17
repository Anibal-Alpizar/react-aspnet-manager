import { MdFamilyRestroom } from "react-icons/md";
import { BsEyeFill, BsEyeSlashFill, BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import {
  TextInput,
  CustomButton,
  ForgotPasswordCard,
} from "../../components/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Logo } from "../../assets/auth";
import { ImConnection } from "react-icons/im";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../components/auth/forgotPasswordCard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/redux/rootState";
import { ThemeAction, setTheme } from "../../redux/slice/theme/theme";
import { Dispatch } from "@reduxjs/toolkit";
import { BsMoon, BsSunFill } from "react-icons/bs";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch: Dispatch<ThemeAction> = useDispatch();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  // !TODO: type FormData
  const onsubmit = handleSubmit(async (data: any) => {
    const user = await signIn(data);
    if (user) {
      navigate("/home");
      loginErrors.length = 0;
    }
  });

  useEffect(() => {
    if (loginErrors.length > 0) toast.error(loginErrors.join("\n"));
  }, [loginErrors]);

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
      {forgotPassword && <div className="blur-background"></div>}
      <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
        <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl">
          {/* left */}
          <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
            <div className="w-full flex gap-2 items-center mb-6">
              <div className="p-2 bg-[#07305d] rounded text-white">
                <MdFamilyRestroom />
              </div>
              <span className="text-2xl text-[#07305d] font-semibold">
                Asomameco
              </span>
            </div>
            <p className="text-ascent-1 text-base font-semibold">
              Ingresa con tu cuenta
            </p>
            <span className="text-sm mt-2 text-ascent-2">
              Bienviendo de vuelta
            </span>
            <form className="py-8 flex flex-col gap-5" onSubmit={onsubmit}>
              <TextInput
                name="id"
                placeholder="Número de identificación"
                label="Número de identificación"
                type="text"
                id="idId"
                register={register("id", {
                  required: "El número de identificación es requerido",
                })}
                styles="w-full rounded-full"
                labelStyles="ml-2"
                error={errors.email ? errors.email.message : ""}
              />
              <div className="relative">
                <TextInput
                  type={showPassword ? "text" : "password"}
                  id="passwordId1"
                  name="password"
                  placeholder="Contraseña"
                  label="Contraseña"
                  styles="w-full rounded-full pr-10"
                  labelStyles="ml-2"
                  register={register("clave", {
                    required: "La contraseña es requerida",
                  })}
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






              <Link
                to="#"
                onClick={() => setForgotPassword(true)}
                className="text-sm text-right text-[#0b488c] font-semibold ">
                Olvidaste tu contraseña?
              </Link>






              <CustomButton
                type="submit"
                containerStyles={`inline-flex justify-center rounded-md bg-[#e4872c] px-8 py-3 text-sm font-medium text-white outline-none`}
                title="Iniciar sesión"
              />
            </form>
            <div className="text-ascent-2 text-sm text-center">
              ¿No tienes una cuenta?
              <Link
                to="/register"
                className="text-[#0b488c] font-semibold ml-2 cursor-pointer"
              >
                Pre-regístrate
              </Link>
              <div className="flex items-center justify-center gap-2 mt-4">
                <p>
                  <Link
                    to="/"
                    className="text-[#0b488c] font-semibold ml-2 cursor-pointer"
                  >
                    Ir a la página principal
                  </Link>
                  <span className="font-extrabold"> | </span>
                </p>
                <button onClick={() => handleTheme()}>
                  {theme ? <BsMoon /> : <BsSunFill />}
                </button>
              </div>
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
              <p className="text-white text-base">ASOMAMECO</p>
              <span className="text-sm text-white/80">
                Asociación de Maridos a Mecate Corto
              </span>
            </div>
          </div>
        </div>
      </div>
      {forgotPassword && (
        <ForgotPasswordCard onCancel={() => setForgotPassword(false)} />
      )}
    </>
  );
}

export default LoginPage;
