import { Box, Text } from "@mantine/core";
import NodoPregunta from "../NodoPregunta";
import { PreguntaAgendar } from "./PreguntaAgendar";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";
import axios from "axios";
import { PreguntaBienvenida } from "./PreguntaBienvenida";
import {
  MensajeModificarBienvenida,
  MensajeMostrarCitas,
} from "../../../Components/Chatbot/MensajesModificarCita";
import { PreguntaMenuModificar } from "./PreguntaMenuModificar";
import { PreguntaConfirmacionEliminar } from "./PreguntaConfirmacionEliminar";

//PreguntaModificar -> PreguntaMenuModificar
export const PreguntaEliminar = new NodoPregunta(
  null,
  null,
  (e) => {
    console.log(e);
    let error = (
      <>
        <BotMensaje>
          <Text>{e.message}</Text>
        </BotMensaje>
        <MensajeMostrarCitas mensaje="Elije una cita para eliminarla" />
      </>
    );

    NodoPregunta.addMensaje(error);
    return;
  },
  (cita) => {
    console.log("bien");
    let { terapeuta_datos } = { ...cita };
    delete cita.terapeuta_datos;
    NodoPregunta.setDatos({
      cita: {
        ...NodoPregunta.datos.cita,
        ...cita,
      },
      terapeuta: {
        ...terapeuta_datos,
      },
    });
    NodoPregunta.setPregunta(PreguntaConfirmacionEliminar);
    // NodoPregunta.setPregunta(siguiente);
  },
  (
    <>
      <MensajeModificarBienvenida />
      <MensajeMostrarCitas mensaje="Elije una cita para eliminarla" />
    </>
  ),
  async (value) => {
    let seleccionado = NodoPregunta.opciones[value - 1];
    if (!seleccionado) throw new Error("Opcion no identificada");
    return seleccionado;
  }
);
