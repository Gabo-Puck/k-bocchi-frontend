import { Box, Text } from "@mantine/core";
import MensajeOpcionesCrud from "../../../Components/Chatbot/MensajeOpcionesCrud";
import NodoPregunta from "../NodoPregunta";
import {
  MensajeBienvenidaAgendar,
  MensajeFechasOpciones,
  MensajeIngresarFecha,
  MensajeListaHorarios,
  MensajeNombre,
  MensajeSeleccionarHorario,
  MensajeSeleccionarModalidad,
} from "../../../Components/Chatbot/MensajesAgendarCita";
import axios from "axios";
import { PreguntaSeleccionarTerapeuta } from "./PreguntaSeleccionarTerapeuta";
import { PreguntaSeleccionarDomicilio } from "./PreguntaSeleccionarDomicilio";
import { PreguntaConfirmacionAgendar } from "./PreguntaConfirmacionAgendar";

//PreguntaSeleccionarModalidad ->PreguntaSeleccionarDomicilio
export const PreguntaSeleccionarHora = new NodoPregunta(
  null,
  null,
  (error) => {
    console.log(error);
    NodoPregunta.addMensaje(
      <>
        <Box>
          <Text>{error.message}</Text>
        </Box>
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
