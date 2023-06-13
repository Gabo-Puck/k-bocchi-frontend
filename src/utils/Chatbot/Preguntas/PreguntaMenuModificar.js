import { Box, Text } from "@mantine/core";
import NodoPregunta from "../NodoPregunta";
import { PreguntaAgendar } from "./PreguntaAgendar";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";
import axios from "axios";
import { PreguntaBienvenida } from "./PreguntaBienvenida";
import {
  MensajeElegirParametro,
  MensajeModificarBienvenida,
  MensajeMostrarCitas,
} from "../../../Components/Chatbot/MensajesModificarCita";
import { PreguntaModificarFecha } from "./PreguntaModificarFecha";

export const PreguntaMenuModificar = new NodoPregunta(
  null,
  null,
  (e) => {
    console.log(e);
    let error = (
      <>
        <BotMensaje>
          <Text>{e.message}</Text>
        </BotMensaje>
        <MensajeElegirParametro />
      </>
    );

    NodoPregunta.addMensaje(error);
    return;
  },
  (pregunta) => {
    console.log("bien");
    NodoPregunta.setPregunta(pregunta)
  },
  (
    <>
      <MensajeElegirParametro />
    </>
  ),
  async (value) => {
    switch (value) {
      case "1":
        //fecha
        return PreguntaModificarFecha;
      case "2":
        //hora
        return;
      case "3":
        //ambas
        return;
      case "4":
        //domicilio
        let { terapeuta } = NodoPregunta.datos;
        if (terapeuta.servicio_domicilio == 1) {
          throw new Error("Opción no identificada");
        }
        break;
      default:
        throw new Error("Opción no identificada");
    }
  }
);
export function getFecha(fecha) {
  // Obtener la fecha actual

  // Obtener el año, mes y día
  let año = fecha.getFullYear();
  let mes = String(fecha.getMonth() + 1).padStart(2, "0"); // El mes es base 0, por lo que se le suma 1
  let día = String(fecha.getDate()).padStart(2, "0");

  // Formatear la fecha en el formato YYYY-mm-dd
  let fechaFormateada = `${año}-${mes}-${día}`;

  console.log(fechaFormateada);
  return fechaFormateada;
}
