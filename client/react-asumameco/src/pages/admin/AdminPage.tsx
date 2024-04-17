import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../hooks/useAuth";
import { useEvents } from "../../hooks/useEvents";
import { useReports } from "../../hooks/useReports";
import { TopBar } from "../../components/home/";
import { Associate, Manager } from "../../interfaces/context/managers/user";
import {
  AddUser,
  AssociateCard,
  ManagersCard,
  EventsTable,
  ReportsButtons,
} from "../../components/admin";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const { associates, managers } = useUsers();
  const { user, isAuth } = useAuth();
  const { events } = useEvents();
  const {
    usersReportRequest,
    eventsReportRequest,
    eventsCalendarReportRequest,
  } = useReports();

  const navigate = useNavigate();

  if (!isAuth) navigate("/login");

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-2xl font-semibold text-gray-800">Cargando...</p>
      </div>
    );
  }

  const handleDownloadReport = async (reportType: string) => {
    try {
      let url;
      switch (reportType) {
        case "usuarios":
          url = await usersReportRequest();
          break;
        case "eventos":
          url = await eventsReportRequest();
          break;
        case "calendario_eventos":
          url = await eventsCalendarReportRequest();
          break;
        default:
          console.error("Tipo de reporte no válido");
      }

      if (url) {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `reporte_${reportType}.html`);
        document.body.appendChild(link);
        link.click();
      }
    } catch (error) {
      console.error(`Error al descargar el reporte de ${reportType}:`, error);
    }
  };

  return (
    <>
      <TopBar />
      <div className="h-screen overflow-y-scroll bg-bgColor p-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 lg:gap-8">
          <AddUser idRol={user.idRol} user={user} />

          <div className="lg:col-span-2 p-4 bg-bgColor mt-3 border-b border-[#66666645]">
            <p className="text-ascent-2 font-semibold pb-3">Asociados</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {associates.length > 0 ? (
                associates.map((associate: Associate) => (
                  <AssociateCard key={associate.id} associate={associate} />
                ))
              ) : (
                <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                  <p className="text-ascent-2 text-center">
                    No hay asociados de momento
                  </p>
                </div>
              )}
            </div>

            {user.idRol === 1 && (
              <div className="pt-10">
                <p className="text-ascent-2 font-semibold pb-3">Encargados</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {managers.length > 0 ? (
                    managers.map((manager: Manager) => (
                      <ManagersCard key={manager.id} manager={manager} />
                    ))
                  ) : (
                    <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                      <p className="text-ascent-2 text-center">
                        No hay encargados de momento
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {user.idRol === 1 && (
              <>
                <div className="pt-10">
                  <p className="text-ascent-2 font-semibold pb-3">Eventos</p>
                  <EventsTable events={events} />
                </div>

                <div className="pt-10">
                  <p className="text-ascent-2 font-semibold pb-3">Reportes</p>

                  <ReportsButtons
                    handleDownloadReport={handleDownloadReport}
                    reportType="usuarios"
                  />
                  <ReportsButtons
                    handleDownloadReport={handleDownloadReport}
                    reportType="eventos"
                  />
                  <ReportsButtons
                    handleDownloadReport={handleDownloadReport}
                    reportType="calendario_eventos"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
