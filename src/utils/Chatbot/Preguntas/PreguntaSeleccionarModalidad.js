import { Box, Text } from "@mantine/core";
import NodoPregunta from "../NodoPregunta";
import {
  MensajeSeleccionarModalidad,
} from "../../../Components/Chatbot/MensajesAgendarCita";
import { PreguntaSeleccionarDomicilio } from "./PreguntaSeleccionarDomicilio";
import { PreguntaSeleccionarFecha } from "./PreguntaSeleccionarFecha";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";

//PreguntaSeleccionarModalidad -> PreguntaSeleccionarDomicilio
//PreguntaSeleccionarModalidad -> PreguntaSeleccionarFecha
export const PreguntaSeleccionarModalidad = new NodoPregunta(
  null,
  null,
  (e) => {
    console.log(e);
    let error = (
      <>
        <BotMensaje>
          <Text>{e.message}</Text>
        </BotMensaje>
        
        <MensajeSeleccionarModalidad />
      </>
    );
    NodoPregunta.addMensaje(error);
    return;
  },
  (resultados) => {
    console.log("bien");
    // NodoPregunta.setPregunta(siguiente);
  },
  (
    <>
      <MensajeSeleccionarModalidad />
    </>
  ),
  async (value) => {
    switch (value) {
      case "1":
        console.log("consultorio");
        setTerapeutaConsultorioDatos(NodoPregunta.datos.terapeuta);
        NodoPregunta.setPregunta(PreguntaSeleccionarFecha);
        break;
      case "2":
        console.log("domicilio");
        NodoPregunta.setPregunta(PreguntaSeleccionarDomicilio);
        break;
      default:
        throw new Error("Opcion no reconocida");
    }
  },
  () => {
    let { terapeuta } = NodoPregunta.datos;
    if (
      terapeuta.servicio_domicilio === 1 &&
      terapeuta.nombre_del_consultorio !== ""
    ) {
      // alert("Ambos");
      return true;
    }
    if (
      terapeuta.servicio_domicilio === 1 &&
      terapeuta.nombre_del_consultorio === ""
    ) {
      // alert("Domicilio");
      NodoPregunta.setPregunta(PreguntaSeleccionarDomicilio);
      return false;
    }
    if (
      terapeuta.servicio_domicilio === 0 &&
      terapeuta.nombre_del_consultorio !== ""
    ) {
      // alert("Consultorio");
      setTerapeutaConsultorioDatos(terapeuta);
      NodoPregunta.setPregunta(PreguntaSeleccionarFecha);
      return false;
    }
  }
);

function setTerapeutaConsultorioDatos(terapeuta) {
  NodoPregunta.setDatos({
    cita: {
      ...NodoPregunta.datos.cita,
      modalidad: "consultorio",
      lat: terapeuta.lat,
      lng: terapeuta.lng,
      domicilio: terapeuta.domicilio,
    },
  });
}
