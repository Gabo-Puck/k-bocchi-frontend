import { Box, Text } from "@mantine/core";
import MensajeOpcionesCrud from "../../../Components/Chatbot/MensajeOpcionesCrud";
import NodoPregunta from "../NodoPregunta";
import { PreguntaAgendar } from "./PreguntaAgendar";
import BotMensaje from "../../../Components/Chatbot/BotMensaje";


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
          throw new Error("Opcion no implementada")
          break;
        case "3":
          console.log("Cancelar");
          throw new Error("Opcion no implementada")
          //Cancelar
          break;
        default:
          throw new Error("Opcion no reconocida");
      }
    }
  );
  