import { Box, Text } from "@mantine/core";
import MensajeOpcionesCrud from "../../../Components/Chatbot/MensajeOpcionesCrud";
import NodoPregunta from "../NodoPregunta";
import { PreguntaAgendar } from "./PreguntaAgendar";


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
          <Box>
            <Text>{e.message}</Text>
          </Box>
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
  