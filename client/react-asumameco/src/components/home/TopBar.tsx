import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { ThemeAction, setTheme } from "../../redux/slice/theme/theme";
import { Dispatch } from "@reduxjs/toolkit";
import { CustomButton } from ".";
import { useAuth } from "../../hooks/useAuth";
import { RootState } from "../../interfaces/redux/rootState";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/landing/Logo.jpg";
import styled from "styled-components";

const ImageContainer = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

function TopBar() {
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch: Dispatch<ThemeAction> = useDispatch();
  const { signOut, user } = useAuth();

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";
    dispatch(setTheme(themeValue));
  };

  const handleLogout = async () => {
    const res = await signOut();
    toast.success(res.message);
  };

  if (user === undefined) window.location.reload();

  if (!user) return null;

  return (
    <>
      <ToastContainer />
      <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary">
        <Link to="/" className="flex gap-2 items-center">
          <div className="p-1 md:p-2 rounded text-white">
            <ImageContainer src={logo} alt="logo" />
          </div>
          <span className="text-xl md:text-2xl text-[#065ad8] font-semibold">
            Asomameco
          </span>
        </Link>
        <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
          <button onClick={() => handleTheme()}>
            {theme ? <BsMoon /> : <BsSunFill />}
          </button>
          <div className="hidden lg:flex"></div>
        </div>

        <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
          <CustomButton
            onClick={() => {
              handleLogout();
            }}
            title="Cerrar sesión"
            containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          />
          {user.idRol.toString() !== "" && (
            <Link to="/admin">
              <CustomButton
                title="Admin"
                containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
              />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default TopBar;
