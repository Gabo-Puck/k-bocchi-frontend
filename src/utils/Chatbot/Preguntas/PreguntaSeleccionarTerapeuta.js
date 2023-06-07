import { Box, Text } from "@mantine/core";
import MensajeOpcionesCrud from "../../../Components/Chatbot/MensajeOpcionesCrud";
import NodoPregunta from "../NodoPregunta";
import {
  MensajeAvisoVariosTerapeutas,
  MensajeBienvenidaAgendar,
  MensajeNombre,
  MensajeSeleccionarTerapeuta,
} from "../../../Components/Chatbot/MensajesAgendarCita";
import { PreguntaSeleccionarModalidad } from "./PreguntaSeleccionarModalidad";
//PreguntaSeleccionarTerapeuta -> PreguntaSeleccionarModalidad
export const PreguntaSeleccionarTerapeuta = new NodoPregunta(
  null,
  null,
  (e) => {
    console.log(e);
    let error = (
      <>
        <Box>
          <Text>{e.message}</Text>
        </Box>
        <MensajeSeleccionarTerapeuta />
      </>
    );
    NodoPregunta.addMensaje(error);
    return;
  },
  (seleccionado) => {
    console.log("bien");
    NodoPregunta.setDatos({
      terapeuta: seleccionado,
      cita: { ...NodoPregunta.datos.cita, id_terapeuta: seleccionado.id },
    });
    NodoPregunta.setPregunta(PreguntaSeleccionarModalidad);
  },
  (
    <>
      <MensajeAvisoVariosTerapeutas />
      <MensajeSeleccionarTerapeuta />
    </>
  ),
  async (value) => {
    if (value <= 0 || value > NodoPregunta.opciones.length)
      throw new Error("Opcion no identificada");
    let seleccionado = NodoPregunta.opciones[value - 1];
    return seleccionado;
  }
);