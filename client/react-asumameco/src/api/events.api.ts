import { client } from "./axios";

export const allEventsRequest = async () => client.get("Evento/GetEventos");

export const createEventRequest = async (formData: FormData) => {
  try {
    const response = await client.post("Evento/CrearEvento", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const participateEventRequest = async (
  IdEvento: number,
  IdAsociado: number
) => {
  try {
    const response = await client.post("Evento/ConfirmarAsistencia", {
      IdEvento,
      IdAsociado,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteEventRequest = async (IdEvento: number) => {
  try {
    const response = await client.delete(`Evento/BorrarEvento/${IdEvento}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAssistanceRequest = async (idEvento: number) => {
  try {
    const response = await client.get(`Evento/GetAsistencias/${idEvento}`);
    return response;
  } catch (error) {
    throw error;
  }
};
