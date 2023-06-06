import { Box, Text } from "@mantine/core";
import MensajeOpcionesCrud from "../../../Components/Chatbot/MensajeOpcionesCrud";
import NodoPregunta from "../NodoPregunta";
import {
  MensajeBienvenidaAgendar,
  MensajeNombre,
  MensajeSeleccionarModalidad,
} from "../../../Components/Chatbot/MensajesAgendarCita";
import axios from "axios";
import { PreguntaSeleccionarTerapeuta } from "./PreguntaSeleccionarTerapeuta";

//PreguntaSeleccionarModalidad ->
export const PreguntaSeleccionarModalidad = new NodoPregunta(
  null,
  null,
  (e) => {
    console.log(e);
    let error = (
      <>
        <Box>
          <Text>{e.message}</Text>
        </Box>
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
        break;
      case "2":
        console.log("domicilio");
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
      alert("Ambos");
      return true;
    }
    if (
      terapeuta.servicio_domicilio === 1 &&
      terapeuta.nombre_del_consultorio === ""
    ) {
      alert("Domicilio");
      return false;
    }
    if (
      terapeuta.servicio_domicilio === 0 &&
      terapeuta.nombre_del_consultorio !== ""
    ) {
      alert("Consultorio");
      NodoPregunta.setDatos({
        cita: {
          ...NodoPregunta.datos.cita,
          modalidad: "consultorio",
          lat: terapeuta.lat,
          lng: terapeuta.lng,
        },
      });
      return false;
    }
  }
);
