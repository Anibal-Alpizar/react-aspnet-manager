import { FcApprove, FcDisapprove } from "react-icons/fc";
import { NoProfile } from "../../assets/home";
import { Associate } from "../../interfaces/context/managers/user";
import { useUsers } from "../../hooks/useUsers";
import { MdDelete } from "react-icons/md";

function AssociateCard({ associate }: { associate: Associate }) {
  const { cambiarEstadoAsociado, deleteAsociado } = useUsers();

  const handleEstadoUsuario = () => {
    cambiarEstadoAsociado(associate.id, !associate.estado);
  };

  const handleDeleteAsociado = () => {
    deleteAsociado(associate.id);
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
              {associate.nombre} {associate.apellidos}
            </p>
            <p className="text-ascent-2 text-sm">{associate.email}</p>
            <p className="text-ascent-2 text-xs">
              {associate.estado ? "Usuario activo" : "Usuario inactivo"}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-ascent-2 text-sm"> 🆔 {associate.id}</p>
        <p className="text-ascent-2 text-sm"> 📞 {associate.telefono}</p>
      </div>

      <div className="flex items-center justify-between text-ascent-1">
        <button
          onClick={handleEstadoUsuario}
          className="flex justify-center items-center gap-2 px-2 hover:bg-primary hover:text-ascent-2 rounded-full p-1"
        >
          {associate.estado ? (
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
          onClick={() => handleDeleteAsociado()}
          className="flex justify-center items-center gap-2 px-2 hover:bg-primary hover:text-ascent-2 rounded-full p-1"
        >
          <MdDelete size={26} color="red" />
        </button>
      </div>
    </div>
  );
}

export default AssociateCard;
