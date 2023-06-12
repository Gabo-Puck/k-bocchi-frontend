import { Box, Text } from "@mantine/core";
import MensajeOpcionesCrud from "../../../Components/Chatbot/MensajeOpcionesCrud";
import NodoPregunta from "../NodoPregunta";
import {
  MensajeBienvenidaAgendar,
  MensajeCitaConfirmacion,
  MensajeCitaInformacion,
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
import { PreguntaBienvenida } from "./PreguntaBienvenida";
import { type } from "@testing-library/user-event/dist/type";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";

//PreguntaSeleccionarModalidad ->PreguntaSeleccionarDomicilio
export const PreguntaConfirmacionAgendar = new NodoPregunta(
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
        <MensajeCitaInformacion />
        <MensajeCitaConfirmacion />
      </>
    );
  },
  (Siguiente) => {
    NodoPregunta.setPregunta(Siguiente);
  },
  (
    <>
      <MensajeCitaInformacion />
      <MensajeCitaConfirmacion />
    </>
  ),
  async (value) => {
    try {
      switch (value) {
        case "1":
          await axios.post("/citas", {
            ...NodoPregunta.datos.cita,
          });
          NodoPregunta.addMensaje(
            <>
              <BotMensaje>
                <Text>¡Listo! He guardado tu cita 😉</Text>
              </BotMensaje>
            </>
          );
          return PreguntaBienvenida;
        case "2":
          return PreguntaBienvenida;
        default:
          throw new Error("Opcion no reconocida");
      }
    } catch (err) {
      if (err.message) throw err;
      throw new Error("Algo ha salido mal");
    }
  }
  //   () => {}
);
