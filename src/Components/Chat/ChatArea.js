import { LoadingOverlay, ScrollArea, Stack, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUsuario } from "../../utils/usuarioHooks";
import { showNegativeFeedbackNotification } from "../../utils/notificationTemplate";
import axios from "axios";
import Mensajes from "./Mensajes";

export default function ChatArea({ chatItem }) {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const usuario = useSelector(selectUsuario);
  const [mensaje, setMensaje] = useState("");
  async function fecthMensajes() {
    const { id: id_from } = usuario;
    const { id: id_to } = chatItem;
    setLoading(true);
    try {
      let { data: mensajesIniciales } = await axios.get(
        `/mensajes/chat/${id_to}/${id_from}`
      );
      console.log({ mensajesIniciales });
      setMensajes(mensajesIniciales);
    } catch (error) {
      console.log(error);
      if (error) {
        let {
          response: { data },
        } = error;
        showNegativeFeedbackNotification(data);
      }
    }
    setLoading(false);
  }
  useEffect(() => {
    if (chatItem) fecthMensajes();
  }, [chatItem]);
  useEffect(() => {
    console.log({ mensajes });
  }, [mensajes]);
  function handleEnter() {
    if (mensaje) return;
    console.log({ mensaje });
  }
  return loading ? (
    <LoadingOverlay visible />
  ) : (
    <>
      <Stack
        style={{ flex: "1", boxSizing: "border-box" }}
        px="md"
        h="100%"
        w="100%"
        spacing={0}
      >
        <ScrollArea
          offsetScrollbars={false}
          style={{ flex: "1", boxSizing: "border-box" }}
          m="lg"
        >
          <Mensajes mensajes={mensajes} />
        </ScrollArea>
        <form onSubmit={handleEnter}>
          <Textarea
            onChange={({ currentTarget: { value } }) => {
              setMensaje(value);
            }}
          />
        </form>
      </Stack>
    </>
  );
}

function Vacio() {
  return <>Selecciona un chat</>;
}
