import { FcApprove, FcDisapprove } from "react-icons/fc";
import { NoProfile } from "../../assets/home";
import { Manager } from "../../interfaces/context/managers/user";
import { useUsers } from "../../hooks/useUsers";
import { MdDelete } from "react-icons/md";

function ManagersCard({ manager }: { manager: Manager }) {
  const { cambiarEstadoEncargado, deleteEncargado } = useUsers();

  console.log(manager);

  const handleEstadoUsuario = () => {
    cambiarEstadoEncargado(manager.id, !manager.activo);
  };

  const handleDeleteEncargado = () => {
    deleteEncargado(manager.id);
  };

  return (
    <div className="bg-secondary p-8 rounded-lg shadow-md max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <img
            src={NoProfile}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-ascent-1 font-semibold">
              {manager.nombre} {manager.apellidos}
            </p>
            <p className="text-ascent-2 text-sm">{manager.email}</p>
            <p className="text-ascent-2 text-xs">
              {manager.activo ? "Usuario activo" : "Usuario inactivo"}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-ascent-2 text-sm"> 🆔 {manager.id}</p>
        <p className="text-ascent-2 text-sm"> 📞 {manager.telefono}</p>
        <p className="text-ascent-2 text-sm"> 📝 {manager.justificacion} </p>
      </div>
      <div className="flex items-center justify-between text-ascent-1">
        <button
          onClick={handleEstadoUsuario}
          className="flex justify-center items-center gap-2 px-2 hover:bg-primary hover:text-ascent-2 rounded-full p-1"
        >
          {manager.activo ? (
            <>
              Desactivar <FcDisapprove size={26} />
            </>
          ) : (
            <>
              Activar <FcApprove size={26} />
            </>
          )}
        </button>
        <button
          onClick={() => handleDeleteEncargado()}
          className="flex justify-center items-center gap-2 px-2 hover:bg-primary hover:text-ascent-2 rounded-full p-1"
        >
          <MdDelete size={26} color="red" />
        </button>
      </div>
    </div>
  );
}

export default ManagersCard;
