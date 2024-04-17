import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../interfaces/context/auth/user";
import { NoProfile } from "../../assets/home";
import { useAuth } from "../../hooks/useAuth";
import { LiaEditSolid } from "react-icons/lia";
import EditProfile from "./EditProfile";

function ProfileCard({ user }: { user: User | null }) {
  const { user: data } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  if (!user) {
    return (
      <div className="w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4">
      <div className="w-full flex items-center justify-between border-b pb-5 border-[#66666645]">
        <Link to="/profile" className="flex gap-2">
          <img
            src={NoProfile}
            alt={user.nombre.charAt(0) || "U"}
            className="w-14 h-14 object-cover rounded-full"
          />
          <div className="flex flex-col justify-center">
            <p className="text-lg font-medium text-ascent-1">
              {user.nombre}
              {user.apellidos}
            </p>
            <span className="text-ascent-2">{user.email}</span>
          </div>
        </Link>
        <div>
          {user.id === data?.id ? (
            <LiaEditSolid
              size={22}
              className="text-blue cursor-pointer"
              onClick={openModal}
            />
          ) : (
            ""
          )}
        </div>
      </div>

      {isModalOpen && <EditProfile />}
    </div>
  );
}

export default ProfileCard;
