import {
  Box,
  Button,
  Flex,
  Grid,
  Loader,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import MensajeBienvenida from "../../Components/Chatbot/MensajeBienvenida";
import MensajeOpcionesCrud from "../../Components/Chatbot/MensajeOpcionesCrud";
import { MdPersonSearch } from "react-icons/md";
import NodoPregunta from "../../utils/Chatbot/NodoPregunta";
import { PreguntaBienvenida } from "../../utils/Chatbot/Preguntas/PreguntaBienvenida";
import { useSelector } from "react-redux";
const selectUsuarioId = (state) => state.usuario.paciente.id;
function useMensajes() {
  const [mensajes, setMensajes] = useState([
    { key: 0, element: <MensajeBienvenida /> },
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
  const popMensaje = (mensaje) => {
    setMensajes((mensajes) => {
      let mensajesPop = [...mensajes];
      mensajesPop.pop();
      return mensajesPop;
    });
    setUniqueKey((key) => key + 1);
  };

  return [mensajes, addMensaje, popMensaje];
}
// let skip = true;
export default function ChatBot() {
  const theme = useMantineTheme();
  const [skip, setSkip] = useState(true);
  const [pensando, setPensando] = useState(false);
  const [mensajes, addMensaje, popMensaje] = useMensajes();
  const refInput = useRef(null);
  const refScrollArea = useRef(null);
  const [preguntaActual, setPreguntaActual] = useState(PreguntaBienvenida);
  const [datos, setDatos] = useState({});
  NodoPregunta.addMensaje = addMensaje;
  NodoPregunta.setPregunta = setPreguntaActual;
  const usuarioId = useSelector(selectUsuarioId);
  useEffect(() => {
    if (!skip) {
      let res = preguntaActual.onInit();
      if (res) addMensaje(preguntaActual.pregunta);
    } else {
      NodoPregunta.setDatos({
        cita: {
          id_paciente: usuarioId,
        },
      });
    }
    setSkip(false);
    // return ()=>{skip=false}
  }, [preguntaActual.pregunta, skip]);
  useEffect(() => {
    refScrollArea.current.scrollTo({
      top: refScrollArea.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensajes]);
  // useEffect(() => {
  //   console.log(datos);
  // }, [datos]);
  return (
    <Stack w="100%" mih="100%" mah="100%" justify="center">
      <Stack mah="80%" mih="20%" w="100%">
        <ScrollArea.Autosize mah="75vh" mih="75vh" viewportRef={refScrollArea}>
          {mensajes.map((m) => m.element)}
        </ScrollArea.Autosize>
      </Stack>
      <Flex w="100%">
        <TextInput
          ref={refInput}
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
            addMensaje(<Text children={refInput.current.value}></Text>);
            preguntaActual.onSubmit(refInput.current.value);
            refInput.current.value = "";
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
  );
}
