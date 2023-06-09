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
import { PreguntaModificarHora } from "./PerguntaModificarHora";
import { PreguntaModificarDesicion } from "./PreguntaModificarDesicion";
import { MensajeFechasOpciones } from "../../../Components/Chatbot/MensajesAgendarCita";
import { PreguntaSeleccionarFecha } from "./PreguntaSeleccionarFecha";
import { PreguntaSeleccionarDomicilio } from "./PreguntaSeleccionarDomicilio";

export const PreguntaMenuModificar = new NodoPregunta(
  null,
  null,
  ({ message }) => {
    // console.log(e);
    let error = (
      <>
        <BotMensaje>
          <Text>{message}</Text>
        </BotMensaje>
        <MensajeElegirParametro />
      </>
    );

    NodoPregunta.addMensaje(error);
    return;
  },
  (pregunta) => {
    console.log("bien");
    NodoPregunta.setPregunta(pregunta);
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
        let { id } = NodoPregunta.datos.terapeuta;
        let { fecha: fecha_completa } = NodoPregunta.datos.cita;
        let fecha = fecha_completa.split("T")[0];
        let horariosResponse;
        try {
          horariosResponse = await axios.get(
            `/citas/validarFecha/${id}?fecha=${fecha}`
          );
          NodoPregunta.opciones = horariosResponse.data.horarios_disponibles;
          return PreguntaModificarHora;
        } catch (err) {
          if (!err) throw new Error("Algo ha salido mal :c");
          if (err.response.status === 420) {
            NodoPregunta.opciones = err.response.data;
            console.log(NodoPregunta.opciones);
            return PreguntaModificarDesicion;
          }
          throw { message: err.response.data, status: err.response.status };
        }
      //hora
      case "3":
        return PreguntaSeleccionarFecha;
      //ambas
      case "4":
        //domicilio
        return PreguntaSeleccionarDomicilio;
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
