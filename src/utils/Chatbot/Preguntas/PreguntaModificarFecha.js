import { Box, Text } from "@mantine/core";
import NodoPregunta from "../NodoPregunta";
import {
  MensajeFechasOpciones,
  MensajeIngresarFecha,
} from "../../../Components/Chatbot/MensajesAgendarCita";
import axios from "axios";
import { PreguntaSeleccionarHora } from "./PreguntaSeleccionarHora";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";
import { PreguntaConfirmacionAgendar } from "./PreguntaConfirmacionAgendar";

//PreguntaSeleccionarModalidad ->PreguntaSeleccionarDomicilio
export const PreguntaModificarFecha = new NodoPregunta(
  null,
  null,
  ({ status, data, message }) => {
    console.log({ status, data, message });
    // if (!error) return;
    if (status === 420) {
      NodoPregunta.addMensaje(<MensajeFechasOpciones fechas={data} />);
      return;
    }
    if (message) {
      NodoPregunta.addMensaje(
        <>
          <BotMensaje>
            <Text>{message}</Text>
          </BotMensaje>
        </>
      );
    } else {
      NodoPregunta.addMensaje(
        <>
          <BotMensaje>
            <Text>{data}</Text>
          </BotMensaje>
        </>
      );
    }
    NodoPregunta.addMensaje(
      <>
        <MensajeIngresarFecha />
      </>
    );
  },
  (fecha) => {
    console.log("bien");
    console.log(fecha);
    // NodoPregunta.setPregunta(siguiente);
    NodoPregunta.setDatos({
      cita: { ...NodoPregunta.datos.cita, fecha },
    });
    NodoPregunta.setPregunta(PreguntaConfirmacionAgendar);
  },
  (
    <>
      <MensajeIngresarFecha />
    </>
  ),
  async (value) => {
    let { fecha: fecha_cita } = NodoPregunta.datos.cita;
    let hora = fecha_cita.split("T")[1].substring(0, 8);
    try {
      await axios.get(
        `/citas/validarCambioFecha/${NodoPregunta.datos.cita.id_terapeuta}?fecha=${value}&hora=${hora}`
      );

      return `${value}T${hora}.000Z`;
    } catch (err) {
      if (!err) throw new Error("Algo ha salido mal :c");
      let { status, data } = err.response;
      throw { status, data };
    }
  }
  //   () => {}
);
