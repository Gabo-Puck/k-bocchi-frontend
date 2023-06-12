import { Box, Text } from "@mantine/core";
import NodoPregunta from "../NodoPregunta";
import {
  MensajeAvisoVariosTerapeutas,
  MensajeSeleccionarTerapeuta,
} from "../../../Components/Chatbot/MensajesAgendarCita";
import { PreguntaSeleccionarModalidad } from "./PreguntaSeleccionarModalidad";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";
//PreguntaSeleccionarTerapeuta -> PreguntaSeleccionarModalidad
export const PreguntaSeleccionarTerapeuta = new NodoPregunta(
  null,
  null,
  (e) => {
    console.log(e);
    let error = (
      <>
        <BotMensaje>
          <Text>{e.message}</Text>
        </BotMensaje>
        
        <MensajeSeleccionarTerapeuta />
      </>
    );
    NodoPregunta.addMensaje(error);
    return;
  },
  (seleccionado) => {
    console.log("bien");
    NodoPregunta.setDatos({
      terapeuta: seleccionado,
      cita: { ...NodoPregunta.datos.cita, id_terapeuta: seleccionado.id },
    });
    NodoPregunta.setPregunta(PreguntaSeleccionarModalidad);
  },
  (
    <>
      <MensajeAvisoVariosTerapeutas />
      <MensajeSeleccionarTerapeuta />
    </>
  ),
  async (value) => {
    let seleccionado = NodoPregunta.opciones[value - 1];
    if (!seleccionado) throw new Error("Opcion no identificada");
    return seleccionado;
  }
);
