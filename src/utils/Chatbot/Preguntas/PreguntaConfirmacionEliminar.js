import { Text } from "@mantine/core";
import NodoPregunta from "../NodoPregunta";
import {
  MensajeCitaConfirmacion,
  MensajeCitaInformacion,
  confirmarEliminar,
} from "../../../Components/Chatbot/MensajesAgendarCita";
import axios from "axios";
import { PreguntaBienvenida } from "./PreguntaBienvenida";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";
import { PreguntaReagendar } from "./PreguntaReagendar";

//PreguntaSeleccionarModalidad ->PreguntaSeleccionarDomicilio
export const PreguntaConfirmacionEliminar = new NodoPregunta(
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
        <MensajeCitaConfirmacion mensaje={confirmarEliminar} />
      </>
    );
  },
  (Siguiente) => {
    NodoPregunta.setPregunta(Siguiente);
  },
  (
    <>
      <MensajeCitaInformacion />
      <MensajeCitaConfirmacion mensaje={confirmarEliminar} />
    </>
  ),
  async (value) => {
    try {
      switch (value) {
        case "1":
          console.log("eliminando");
          console.log(NodoPregunta.datos);
          console.log(NodoPregunta.datos.cita.id);
          let { id } = NodoPregunta.datos.cita;
          await axios.delete(`/citas/${id}`);
          NodoPregunta.addMensaje(
            <>
              <BotMensaje>
                <Text>¡Listo! He eliminado tu cita 😉</Text>
              </BotMensaje>
            </>
          );
          return PreguntaReagendar;
        case "2":
          return PreguntaBienvenida;
        default:
          throw new Error("Opcion no reconocida");
      }
    } catch (err) {
      if (!err) throw new Error("Algo ha salido mal");
      if (err.response) throw { message: err.response.data };
      throw err;
    }
  }
  //   () => {}
);
