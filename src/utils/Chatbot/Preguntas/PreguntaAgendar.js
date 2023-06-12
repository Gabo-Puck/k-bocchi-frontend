import { Box, Text } from "@mantine/core";
import MensajeOpcionesCrud from "../../../Components/Chatbot/MensajeOpcionesCrud";
import NodoPregunta from "../NodoPregunta";
import {
  MensajeBienvenidaAgendar,
  MensajeNombre,
} from "../../../Components/Chatbot/MensajesAgendarCita";
import axios from "axios";
import { PreguntaSeleccionarTerapeuta } from "./PreguntaSeleccionarTerapeuta";
import { PreguntaSeleccionarModalidad } from "./PreguntaSeleccionarModalidad";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";

//PreguntaAgendar -> PreguntaSeleccionarTerapeuta
//PreguntaAgendar -> PreguntaSeleccionarModalidad
export const PreguntaAgendar = new NodoPregunta(
  null,
  null,
  (e) => {
    console.log(e);
    let error = (
      <>
        <BotMensaje>
          <Text>{e.message}</Text>
        </BotMensaje>
        <MensajeNombre />
      </>
    );
    NodoPregunta.addMensaje(error);
    return;
  },
  (resultados) => {
    if (resultados.length === 1) {
      NodoPregunta.setDatos({
        terapeuta: resultados[0],
        cita: { ...NodoPregunta.datos.cita, id_terapeuta: resultados[0].id },
      });
      NodoPregunta.setPregunta(PreguntaSeleccionarModalidad);
    } else {
      NodoPregunta.opciones = resultados;
      console.log(NodoPregunta.opciones);
      NodoPregunta.setPregunta(PreguntaSeleccionarTerapeuta);
    }
    console.log("bien");
    // NodoPregunta.setPregunta(siguiente);
  },
  (
    <>
      <MensajeBienvenidaAgendar />
      <MensajeNombre />
    </>
  ),
  async (value) => {
    let response = await axios.get(
      `/usuarios/fisioterapeutas/buscarNombre/${value}`
    );
    if (!response) throw new Error("Algo ha salido mal :c");
    if (response.data.length === 0)
      throw new Error("No se encontro un terapeuta con ese nombre");

    return response.data;
  }
);
