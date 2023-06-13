import { Box, Text } from "@mantine/core";
import NodoPregunta from "../NodoPregunta";
import MensajeOpcionesCrud from "../../../Components/Chatbot/MensajeOpcionesCrud";
import { PreguntaAgendar } from "./PreguntaAgendar";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";
import { PreguntaModificar, getFecha } from "./PreguntaModificar";
import axios from "axios";

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
      case "2":
        console.log("Modificar");
        let id = NodoPregunta.id_paciente;
        let fecha = getFecha(new Date());
        try {
          let citas = await axios.get(
            `/usuarios/pacientes/${id}/citas?fecha=${fecha}`
          );

          NodoPregunta.opciones = citas.data;
          return PreguntaModificar;
        } catch (err) {
          console.log(err);

          throw new Error("Algo ha salido mal :c");
        }

      case "3":
        console.log("Cancelar");
        throw new Error("Opcion no implementada");
        //Cancelar
        break;
      default:
        throw new Error("Opcion no reconocida");
    }
  },
  () => {
    NodoPregunta.setDatos({
      cita: {
        id_paciente: NodoPregunta.id_paciente,
      },
    });
    return true;
  }
);
