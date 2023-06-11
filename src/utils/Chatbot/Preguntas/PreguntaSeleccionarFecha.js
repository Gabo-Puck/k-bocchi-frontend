import { Box, Text } from "@mantine/core";
import MensajeOpcionesCrud from "../../../Components/Chatbot/MensajeOpcionesCrud";
import NodoPregunta from "../NodoPregunta";
import {
  MensajeBienvenidaAgendar,
  MensajeFechasOpciones,
  MensajeIngresarFecha,
  MensajeNombre,
  MensajeSeleccionarModalidad,
} from "../../../Components/Chatbot/MensajesAgendarCita";
import axios from "axios";
import { PreguntaSeleccionarTerapeuta } from "./PreguntaSeleccionarTerapeuta";
import { PreguntaSeleccionarDomicilio } from "./PreguntaSeleccionarDomicilio";
import { PreguntaSeleccionarHora } from "./PreguntaSeleccionarHora";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";

//PreguntaSeleccionarModalidad ->PreguntaSeleccionarDomicilio
export const PreguntaSeleccionarFecha = new NodoPregunta(
  null,
  null,
  (error) => {
    console.log(error);
    if (!error) return;
    let {
      response: { data },
      response: { status },
    } = error;
    if (status === 420) {
      NodoPregunta.addMensaje(<MensajeFechasOpciones fechas={data} />);
      return;
    }
    NodoPregunta.addMensaje(
      <>
        <BotMensaje>
          <Text>{data}</Text>
        </BotMensaje>
      </>
    );
    NodoPregunta.addMensaje(
      <>
        <MensajeIngresarFecha />
      </>
    );
  },
  ({ data }) => {
    console.log("bien");
    console.log(data);
    // NodoPregunta.setPregunta(siguiente);
    NodoPregunta.opciones = data.horarios_disponibles;
    NodoPregunta.setPregunta(PreguntaSeleccionarHora)
  },
  (
    <>
      <MensajeIngresarFecha />
    </>
  ),
  async (value) => {
    try {
      let horarios_disponibles = await axios.get(
        `/citas/validarFecha/${NodoPregunta.datos.cita.id_terapeuta}?fecha=${value}`
      );

      return horarios_disponibles;
    } catch (err) {
      throw err;
    }
  }
  //   () => {}
);
