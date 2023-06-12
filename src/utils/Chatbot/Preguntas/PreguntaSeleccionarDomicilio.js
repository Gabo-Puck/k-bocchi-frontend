import { Box, Text } from "@mantine/core";
import MensajeOpcionesCrud from "../../../Components/Chatbot/MensajeOpcionesCrud";
import NodoPregunta from "../NodoPregunta";
import {
  MensajeBienvenidaAgendar,
  MensajeNombre,
  MensajeSeleccionarDomicilio,
  MensajeSeleccionarModalidad,
} from "../../../Components/Chatbot/MensajesAgendarCita";
import axios from "axios";
import { PreguntaSeleccionarTerapeuta } from "./PreguntaSeleccionarTerapeuta";
import { abrirMapa } from "../../../Components/Mapa";
import { showNegativeFeedbackNotification } from "../../notificationTemplate";
import { PreguntaSeleccionarFecha } from "./PreguntaSeleccionarFecha";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";

//PreguntaSeleccionarDomicilio -> PreguntaSeleccionarFecha
export const PreguntaSeleccionarDomicilio = new NodoPregunta(
  null,
  null,
  (e) => {
    console.log(e);
    let { message } = e;

    let error = (
      <>
        <BotMensaje>
          <Text>{message}</Text>
        </BotMensaje>
        
        <MensajeSeleccionarDomicilio />
      </>
    );
    NodoPregunta.addMensaje(error);
    return;
  },
  (resultados) => {
    NodoPregunta.setDatos({
      cita: {
        ...NodoPregunta.datos.cita,
        modalidad: "domicilio",
        lat: resultados.lat,
        lng: resultados.lng,
        domicilio: resultados.direccion,
      },
    });
    NodoPregunta.setPregunta(PreguntaSeleccionarFecha);
  },
  (
    <>
      <MensajeSeleccionarDomicilio />
    </>
  ),
  async (value) => {
    if (!value.direccion || !value.lat || !value.lng)
      throw new Error("Vuelve a seleccionar la dirección porfavor");
    console.log(NodoPregunta.datos.terapeuta);
    try {
      let { lat: latA, lng: lngA } = value;
      let { id } = NodoPregunta.datos.terapeuta;
      await axios.get(
        `/citas/validarDomicilio/${id}?latA=${latA}&lngA=${lngA}`
      );
      return value;
    } catch (err) {
      if (!err) throw new Error("Algo ha salido mal :c");
      let { status, data } = err.response;
      throw { status, message: data };
    }
  }
);

export async function seleccionarUbicacion() {
  return new Promise((resolve, reject) => {
    abrirMapa({
      setDatosLat: async ({ coords, direccion }) => {
        resolve({ ...coords, direccion });
      },
    });
  });
}

async function obtenerUbicacionActual() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}`
          )
          .then((value) => {
            resolve({ lat: pos.coords.altitude, lng: pos.coords.longitude });
            console.log(value);
          })
          .catch((err) => {
            console.log(err);
            throw new Error("No se ha podido obtener tu ubicación :c");
          });
        console.log(pos);
      },
      (err) => {
        showNegativeFeedbackNotification(
          "No se pudo obtener la posición actual"
        );
        throw new Error("No se pudo obtener la posición actual");
        console.log(err);
      },
      {
        enableHighAccuracy: true,
      }
    );
  });
}
