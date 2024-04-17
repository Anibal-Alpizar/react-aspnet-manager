import { User } from "../../interfaces/context/auth/user";

function MoreInfo({ user }: { user: User | null }) {
  if (!user) {
    return (
      <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
        <p>Loading user information...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
        <div className=" items-center justify-between text-ascent-1 pb-2 border-b border-[#66666645]">
          <span> Más información</span>
          <div className="w-full flex flex-col gap-4 pt-4">
            {user.idRol === 1 ? (
              <div>
                <span>Rol: Administrador</span>
              </div>
            ) : user.idRol.toString() === "" ? (
              <div>
                <span>Rol: Asociado</span>
              </div>
            ) : (
              <div>
                <span>Rol: Encargado</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreInfo;
