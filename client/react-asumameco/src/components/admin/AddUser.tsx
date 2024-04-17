import { User } from "../../interfaces/context/auth/user";
import { TextInput } from "../auth";
import { useUsers } from "../../hooks/useUsers";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

function AddUser({ user, idRol }: { user: User; idRol: number }) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const { createAsociado, createEncargado } = useUsers();

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      let res;
      if (idRol === 1) {
        res =
          selectedOption === "2"
            ? await createAsociado(data)
            : await createEncargado(data);
      } else {
        res = await createAsociado(data);
      }
      alert(res.data.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert(
          "Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }
  });

  return (
    <div className="p-5 lg:p-1 rounded-md">
      <div className="pt-28 lg:fixed lg:top-7 lg:left-14 lg:w-3/12 md:fixed md:w-5/12">
        <div className="bg-secondary p-8 rounded-lg shadow-md max-w-md w-full mb-4">
          <div className="relative">
            <p>
              <span className="text-ascent-1">Hola 👋,</span>
            </p>
          </div>
          <div className="flex items-center mt-4">
            <h2 className="text-xl font-bold text-ascent-1">
              {user.nombre} {user.apellidos}
            </h2>
          </div>
          <p className="text-ascent-2 mt-2">{user.email}</p>
          <div className="flex items-center mt-4 space-x-4">
            <span className="text-blue-500 hover:underline">
              {user.idRol === 1 ? (
                <div>
                  <span className="text-ascent-1 font-semibold">
                    Rol: Administrador
                  </span>
                </div>
              ) : (
                <div>
                  <span>Rol: Encargado</span>
                </div>
              )}
            </span>
          </div>
        </div>
        <div
          className="bg-secondary
         p-8 rounded-lg shadow-md max-w-md w-full"
        >
          <form onSubmit={onSubmit}>
            <label className="block text-ascent-2 text-sm font-semibold">
              Nuevo usuario
            </label>

            <TextInput
              id="cedula"
              name="cedula"
              type="text"
              placeholder="Cédula del usuario"
              styles="w-full"
              register={register("id", {
                required: "La cédula es requerida",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "La cédula debe ser un número",
                },
                maxLength: {
                  value: 9,
                  message: "La cédula debe tener máximo 9 dígitos",
                },
              })}
              error={errors.cedula ? errors.cedula.message : ""}
            />

            <TextInput
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Nombre del usuario"
              styles="w-full"
              register={register("nombre", {
                required: "El nombre es requerido",
              })}
              error={errors.nombre ? errors.nombre.message : ""}
            />

            <TextInput
              id="apellidos"
              name="apellidos"
              type="text"
              placeholder="Apellidos del usuario"
              styles="w-full"
              register={register("apellidos", {
                required: "Los apellidos son requeridos",
              })}
            />

            <TextInput
              id="telefono"
              name="telefono"
              type="text"
              placeholder="Teléfono del usuario"
              styles="w-full"
              register={register("telefono", {
                required: "El teléfono es requerido",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "El teléfono debe ser un número",
                },
              })}
              error={errors.telefono ? errors.telefono.message : ""}
            />

            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="Correo electrónico"
              styles="w-full"
              register={register("email", {
                required: "El correo es requerido",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <div className="relative">
              <TextInput
                id="clave"
                name="clave"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                styles="w-full pr-10"
                register={register("clave", {
                  required: "La contraseña es requerida",
                })}
                error={errors.clave ? errors.clave.message : ""}
              />

              <button
                type="button"
                className="absolute bottom-2 transform -translate-y-1/2 right-5"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </button>
            </div>

            {idRol === 1 && (
              <div className="mt-6">
                <select
                  id="idRol"
                  name="idRol"
                  className="w-full px-3 py-2 border border-ascent-2 rounded-md focus:outline-none focus:border-primary bg-secondary text-ascent-2 focus:ring-1 focus:ring-primary"
                  onChange={handleSelectChange}
                  value={selectedOption}
                >
                  <option value="1">Encargado</option>
                  <option value="2">Asociado</option>
                </select>
              </div>
            )}

            <div className="flex items-center justify-between"></div>

            <div className="mt-4">
              <p className="text-center text-ascent-2 text-xs">
                &copy;2024 ASOMAMECO - Todos los derechos reservados.
              </p>
            </div>
            <button
              type="submit"
              className="bg-bgColor text-ascent-1 font-semibold py-2 px-4 rounded-md hover:bg-ascent-1 hover:text-bgColor 
              focus:outline-none focus:ring-2 focus:ring-ascent-1 focus:ring-opacity-50 w-full mt-4"
            >
              Crear usuario
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
