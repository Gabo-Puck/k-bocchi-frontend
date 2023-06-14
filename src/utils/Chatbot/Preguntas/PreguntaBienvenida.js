import { Box, Text } from "@mantine/core";
import NodoPregunta from "../NodoPregunta";
import MensajeOpcionesCrud from "../../../Components/Chatbot/MensajeOpcionesCrud";
import { PreguntaAgendar } from "./PreguntaAgendar";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";
import { PreguntaModificar, getFecha } from "./PreguntaModificar";
import axios from "axios";
import { PreguntaMenuModificar } from "./PreguntaMenuModificar";
import { PreguntaEliminar } from "./PreguntaEliminar";
import { PreguntaConfirmacionEliminar } from "./PreguntaConfirmacionEliminar";

//PreguntaBienvenida -> PreguntaAgendar
//PreguntaBienvenida -> PreguntaModificar
//PreguntaBienvenida -> PreguntaCancelar
export const PreguntaBienvenida = new NodoPregunta(
  null,
  null,
  (e) => {
    console.log(e);
    let error = (
      <>
        <BotMensaje>
          <Text>{e.message}</Text>
        </BotMensaje>

        <MensajeOpcionesCrud />
      </>
    );
    NodoPregunta.addMensaje(error);
    return;
  },
  (siguiente) => {
    console.log("bien");
    NodoPregunta.setPregunta(siguiente);
  },
  (
    <>
      <MensajeOpcionesCrud />
    </>
  ),
  async (value) => {
    switch (value) {
      case "1":
        //agendar
        console.log("Agendar");
        return PreguntaAgendar;
      //Modificar
      case "2": {
        console.log("Modificar");
        let id = NodoPregunta.id_paciente;
        let fecha = getFecha(new Date());
        let citas;
        try {
          citas = await axios.get(
            `/usuarios/pacientes/${id}/citas?fecha=${fecha}`
          );
        } catch (err) {
          console.log(err);
          throw new Error("Algo ha salido mal :c");
        }
        if (citas.data.length === 0) {
          throw new Error("Disculpa, no tienes citas proximas 😓");
        }
        if (citas.data.length === 1) {
          let { terapeuta_datos } = { ...citas.data[0] };
          delete citas.data[0].terapeuta_datos;
          NodoPregunta.setDatos({
            cita: {
              ...NodoPregunta.datos.cita,
              ...citas.data[0],
            },
            terapeuta: {
              ...terapeuta_datos,
            },
          });
          return PreguntaMenuModificar;
        }
        NodoPregunta.opciones = citas.data;
        return PreguntaModificar;
      }

      case "3": {
        console.log("Cancelar");
        // throw new Error("Opcion no implementada");
        //Cancelar
        let id = NodoPregunta.id_paciente;
        let fecha = getFecha(new Date());
        let citas;
        try {
          citas = await axios.get(
            `/usuarios/pacientes/${id}/citas?fecha=${fecha}`
          );
        } catch (err) {
          console.log(err);
          throw new Error("Algo ha salido mal :c");
        }
        if (citas.data.length === 0) {
          throw new Error("Disculpa, no tienes citas proximas 😓");
        }
        if (citas.data.length === 1) {
          let { terapeuta_datos } = { ...citas.data[0] };
          delete citas.data[0].terapeuta_datos;
          NodoPregunta.setDatos({
            cita: {
              ...NodoPregunta.datos.cita,
              ...citas.data[0],
            },
            terapeuta: {
              ...terapeuta_datos,
            },
          });
          return PreguntaConfirmacionEliminar;
        }
        NodoPregunta.opciones = citas.data;
        return PreguntaEliminar;
      }
      default:
        throw new Error("Opcion no reconocida");
    }
  },
  () => {
    return resetDatos();
  }
);
export function resetDatos() {
  NodoPregunta.setDatos({
    cita: {
      id_paciente: NodoPregunta.id_paciente,
    },
    terapeuta: null,
  });
  return true;
}
