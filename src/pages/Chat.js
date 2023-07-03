import {
  TextInput,
  Text,
  Table,
  Box,
  ScrollArea,
  Stack,
  Center,
  Flex,
  Grid,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useListState } from "@mantine/hooks";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import { modals } from "@mantine/modals";
import ListaChats from "../Components/Chat/ListaChats";
import { showNegativeFeedbackNotification } from "../utils/notificationTemplate";
import { selectUsuario } from "../utils/usuarioHooks";
import axios from "axios";
import Mensajes from "../Components/Chat/Mensajes";
import ChatArea from "../Components/Chat/ChatArea";

export default function Chat() {
  // const [usuariosConectados, handlers] = useListState([]);
  // const filter = (id) => handlers.filter((item) => item.id !== id);
  const [chats, setChats] = useState();
  const { id: id_usuario } = useSelector(selectUsuario);
  const [chatItem, setChatItem] = useState();
  async function fetchChats() {
    try {
      let { data: chats } = await axios.get(`/mensajes/chats/${id_usuario}`);
      setChats(chats);
    } catch (err) {
      console.log(err);
      if (err) {
        let {
          response: { data },
        } = err;
        showNegativeFeedbackNotification(data);
      }
    }
  }
  useEffect(() => {
    // socket.emit("chat:entrar");
    function onUsuarioConectado(usuario) {
      console.log({ usuario });
      // handlers.append(usuario);
    }
    function onUsuarioDesconectado({ id }) {
      // let usuarios = filter(id);
      // handlers.setState(usuarios);
      console.log({ id });
    }
    function onUsuarioLista(lista) {
      // handlers.setState(lista);
      console.log({ lista });
    }
    socket.on("usuario:conectado", onUsuarioConectado);
    socket.on("usuario:desconectado", onUsuarioDesconectado);
    socket.on("usuario:lista", onUsuarioLista);
    fetchChats();
    return () => {
      socket.off("usuario:lista", onUsuarioLista);
      socket.off("usuario:conectado", onUsuarioConectado);
      socket.off("usuario:desconectado", onUsuarioDesconectado);
    };
  }, []);
  return (
    <>
      <Grid mah="100vh" mih="100vh" w="100%" m={0}>
        <Grid.Col span={4} h="100%">
          {/* <ListaUsuarios usuarios={usuariosConectados} /> */}
          <ListaChats
            chats={chats}
            chatItem={chatItem}
            onClick={(item) => {
              // alert(JSON.stringify(item))

              setChatItem(item);
            }}
          />
        </Grid.Col>
        <Grid.Col span="auto">
          <ChatArea chatItem={chatItem} />
        </Grid.Col>
      </Grid>
    </>
  );
}
