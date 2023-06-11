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

//PreguntaSeleccionarModalidad ->PreguntaSeleccionarDomicilio
export const PreguntaConfirmacionAgendar = new NodoPregunta(
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
        <MensajeCitaInformacion />
        <MensajeCitaConfirmacion />
      </>
    );
  },
  (Siguiente) => {
    NodoPregunta.setPregunta(Siguiente)
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
              <Box>
                <Text>¡Listo! He guardado tu cita :)</Text>
              </Box>
            </>
          );
          return PreguntaBienvenida;
        case "2":
          return PreguntaBienvenida;
        default:
          throw new Error("Opcion no reconocida");
      }
    } catch (err) {
      throw new Error("Algo ha salido mal");
    }
  }
  //   () => {}
);
