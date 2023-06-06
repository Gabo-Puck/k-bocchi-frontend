import {
  Box,
  Button,
  Flex,
  Grid,
  Loader,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useRef, useState } from "react";
import MensajeBienvenida from "../../Components/Chatbot/MensajeBienvenida";
import MensajeOpcionesCrud from "../../Components/Chatbot/MensajeOpcionesCrud";
import { MdPersonSearch } from "react-icons/md";
import NodoPregunta from "../../utils/NodoPregunta";

function useMensajes() {
  const [mensajes, setMensajes] = useState([
    { key: 0, element: <MensajeBienvenida /> },
    { key: 1, element: <MensajeOpcionesCrud /> },
  ]);
  const [uniqueKey, setUniqueKey] = useState(2);
  const addMensaje = (mensaje) => {
    setMensajes((mensajes) => [
      ...mensajes,
      {
        key: uniqueKey,
        element: mensaje,
      },
    ]);
    setUniqueKey((key) => key + 1);
  };
  return [mensajes, addMensaje];
}

export default function ChatBot() {
  const theme = useMantineTheme();
  const [pensando, setPensando] = useState(false);
  const [mensajes, addMensaje] = useMensajes();
  const ref = useRef(null);
  const PreguntaBienvenida = new NodoPregunta(
    null,
    null,
    (e) => {
        console.log(e);
      let error = (
        <>
          <Box>
            <Text>Opcion no reconocida</Text>
          </Box>
          <MensajeOpcionesCrud />
        </>
      );
      addMensaje(error);
      return;
    },
    (siguiente) => {
        console.log(this.pregunta)
        console.log("bien");
    //   setPreguntaActual(siguiente);
    },
    (
      <>
        <MensajeBienvenida />
        <MensajeOpcionesCrud />
      </>
    ),
    async (value) => {
      switch (value) {
        case "1":
          //agendar
          console.log("Agendar");
          break;
        //Modificar
        case "2":
          console.log("Modificar");
          break;
        case "3":
          console.log("Cancelar");
          //Cancelar
          break;
        default:
          throw new Error("Opcion fuera de los parametros");
      }
    }
  );
  const [preguntaActual, setPreguntaActual] = useState(PreguntaBienvenida);
  return (
    <Box w="100%" h="100%">
      <Stack w="100%" h="100%">
        <Stack h="80%" w="100%">
          {mensajes.map((m) => m.element)}
        </Stack>
        <Flex h="20%" w="100%">
          <TextInput
            ref={ref}
            placeholder="Escribe tu respuesta..."
            w="100%"
            radius={0}
            onChange={({ target }) => {}}
          />
          <Button
            radius={0}
            color="green-nature"
            variant="subtle"
            styles={{
              root: {
                border: `1px solid ${theme.colors.gray[4]}`,
                borderLeft: 0,
              },
            }}
            onClick={() => {
              addMensaje(<Text children={ref.current.value}></Text>);
              preguntaActual.onSubmit(ref.current.value);
              ref.current.value = "";
            }}
          >
            {pensando ? (
              <Loader color="green-nature" size="xs" />
            ) : (
              <MdPersonSearch />
            )}
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
