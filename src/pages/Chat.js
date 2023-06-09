import {
  TextInput,
  Text,
  Table,
  Box,
  ScrollArea,
  Stack,
  Center,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useListState } from "@mantine/hooks";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import { modals } from "@mantine/modals";

const selectUsuario = (state) => state.usuario;
export default function Chat() {
  const [usuariosConectados, handlers] = useListState([]);
  const filter = (id) => handlers.filter((item) => item.id !== id);
  useEffect(() => {
    socket.emit("chat:entrar");
    function onUsuarioConectado(usuario) {
      handlers.append(usuario);
    }
    function onUsuarioDesconectado({ id }) {
      let usuarios = filter(id);
      handlers.setState(usuarios);
    }
    function onUsuarioLista(lista) {
      handlers.setState(lista);
    }
    socket.on("usuario:conectado", onUsuarioConectado);
    socket.on("usuario:desconectado", onUsuarioDesconectado);
    socket.on("usuario:lista", onUsuarioLista);
    return () => {
      socket.off("usuario:lista", onUsuarioLista);
      socket.off("usuario:conectado", onUsuarioConectado);
      socket.off("usuario:desconectado", onUsuarioDesconectado);
    };
  }, []);
  return (
    <>
      <Box>
        <ListaUsuarios usuarios={usuariosConectados} />
      </Box>
    </>
  );
}

function ListaUsuarios({ usuarios }) {
  const usuarioActivo = useSelector(selectUsuario);
  return (
    <Table>
      <thead>
        <tr>
          <th>Usuario</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) =>
          usuarioActivo.id === usuario.id ? null : (
            <UsuarioItem key={usuario.id} usuario={usuario} />
          )
        )}
      </tbody>
    </Table>
  );
}

function UsuarioItem({ usuario }) {
  function openModal() {
    modals.open({
      title: `Conversacion con: ${usuario.nombre}`,
      children: <Conversacion destinatario={usuario} />,
      size: "md",
      scrollAreaComponent: ScrollArea.Autosize,
    });
  }
  return (
    <tr onClick={openModal}>
      <td>{usuario.nombre}</td>
    </tr>
  );
}

function Conversacion({ destinatario }) {
  const [mensajesTemporales, handlers] = useListState([]);
  const [mensaje, setMensaje] = useState("");
  const refScrollArea = useRef(null);
  useEffect(() => {
    function onMensajesRecibido(msg) {
      if (msg.from === destinatario.id) handlers.append(msg);
    }
    socket.on("mensajes:recibido", onMensajesRecibido);

    return () => {
      socket.off("mensajes:recibido", onMensajesRecibido);
    };
  }, []);
  useEffect(
    () =>
      refScrollArea.current.scrollTo({
        top: refScrollArea.current.scrollHeight,
        behavior: "smooth",
      }),
    [mensajesTemporales]
  );
  function mandarMensaje(e) {
    if ((e.key === "Enter" || e.keyCode === 13) && mensaje !== "") {
      socket.emit("mensajes:enviar", {
        to: destinatario.id,
        contenido: mensaje,
      });
      handlers.append({
        nombre: "Tú",
        contenido: mensaje,
        fecha: new Date().toISOString().slice(0, 19).replace("T", " "),
      });

      setMensaje("");
    }
  }
  return (
    <Box h="45vh" mah="45vh">
      <Stack h="90%">
        <ScrollArea.Autosize h="100%" viewportRef={refScrollArea}>
          {mensajesTemporales.map((m) => (
            <Mensaje mensaje={m} />
          ))}
        </ScrollArea.Autosize>
      </Stack>
      <Center>
        <TextInput
          w="90%"
          value={mensaje}
          onChange={({ target }) => {
            setMensaje(target.value);
          }}
          onKeyUp={mandarMensaje}
        />
      </Center>
    </Box>
  );
}

function Mensaje({ mensaje }) {
  return (
    <>
      <Text mb="md" style={{ wordWrap: "break-word", width: "90%" }}>
        <Text span fw="bold">
          {mensaje.nombre}
        </Text>
        : {mensaje.contenido}{" "}
        <Text span fz="sm" c="dimmed">
          {mensaje.fecha}
        </Text>
      </Text>
    </>
  );
}
