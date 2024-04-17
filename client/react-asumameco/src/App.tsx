import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Home from "./pages/home/HomePage";
import Profile from "./pages/Profile";
import AdminPage from "./pages/admin/AdminPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { EventsProvider } from "./context/provider/EventsProvider";
import { UsersProvider } from "./context/provider/UsersProvider";
import { ReportProvider } from "./context/provider/ReportProvider";
import { useSelector } from "react-redux";
import { RootState } from "./interfaces/redux/rootState";

function App(): JSX.Element {
  const { isAuth } = useAuth();
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <div data-theme={theme}>
      <Routes>
        {/* logueado */}
        <Route
          element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/home" />}
        >
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route
          element={<ProtectedRoute isAllowed={isAuth} redirectTo="/auth" />}
        >
          <Route
            element={
              <EventsProvider>
                <Outlet />
              </EventsProvider>
            }
          >
            <Route path="/profile" element={<Profile />} />

            <Route
              element={
                <UsersProvider>
                  <ReportProvider>
                    <Outlet />
                  </ReportProvider>
                </UsersProvider>
              }
            >
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            <Route path="/home" element={<Home />} />
          </Route>
        </Route>

        {/* no logueado */}
        <Route
          element={<ProtectedRoute isAllowed={isAuth} redirectTo="/auth" />}
        >
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
