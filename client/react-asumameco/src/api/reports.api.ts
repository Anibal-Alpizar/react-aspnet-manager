import { client } from "./axios";

export const usersReportRequest = async () => {
  try {
    const response = await client.get("reporte/usuarios");
    const blob = new Blob([response.data], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Error fetching users report", error);
    throw error;
  }
};

export const eventsReportRequest = async () => {
  try {
    const response = await client.get("reporte/eventos");
    const blob = new Blob([response.data], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Error fetching events report", error);
    throw error;
  }
};

export const eventsCalendarReportRequest = async () => {
  try {
    const response = await client.get("calendario/eventos");
    const blob = new Blob([response.data], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Error fetching events calendar report", error);
    throw error;
  }
};
