import { Box, Text } from "@mantine/core";
import NodoPregunta from "../NodoPregunta";
import {
  MensajeListaHorarios,
  MensajeSeleccionarHorario,
} from "../../../Components/Chatbot/MensajesAgendarCita";
import { PreguntaConfirmacionAgendar } from "./PreguntaConfirmacionAgendar";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";

//PreguntaSeleccionarModalidad ->PreguntaSeleccionarDomicilio
export const PreguntaSeleccionarHora = new NodoPregunta(
  null,
  null,
  (error) => {
    console.log(error);
    NodoPregunta.addMensaje(
      <>
        <BotMensaje>
          <Text>{error.message}</Text>
        </BotMensaje>
        
      </>
    );
    NodoPregunta.addMensaje(
      <>
        <MensajeSeleccionarHorario />
        <MensajeListaHorarios />
      </>
    );
  },
  (data) => {
    NodoPregunta.setDatos({
      cita: {
        ...NodoPregunta.datos.cita,
        fecha: data.fecha,
      },
    });
    NodoPregunta.setPregunta(PreguntaConfirmacionAgendar);
  },
  (
    <>
      <MensajeSeleccionarHorario />
      <MensajeListaHorarios />
    </>
  ),
  async (value) => {
    let seleccionado = NodoPregunta.opciones[value - 1];
    if (!seleccionado) throw new Error("Opcion no identificada");
    return seleccionado;
  }
  //   () => {}
);
