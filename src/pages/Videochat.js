import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import {
  ActionIcon,
  Box,
  Container,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import {
  FaVolumeMute,
  FaVolumeUp,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
} from "react-icons/fa";
import { useDisclosure, useListState } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { selectUsuario } from "../utils/usuarioHooks";
const useStyles = createStyles((theme) => ({
  videoInsert: {
    width: "100%",
    height: "auto",
  },
}));

export default function Videochat() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [userStream, setUserStream] = useState();
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const { classes, cx } = useStyles();
  const [audio, { toggle: toggleAudio }] = useDisclosure(true);
  const [video, { toggle: toggleVideo }] = useDisclosure(true);
  const [messages, handlers] = useListState();
  const [message, setMessage] = useState("");
  const { nombre } = useSelector(selectUsuario);
  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        setUserStream(mediaStream);
        setRemotePeerIdValue(call.peer)
        // currentUserVideoRef.current.play();
        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
          // remoteVideoRef.current.play();
        });
      });
    });
    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        console.log({data});
        handlers.append(data);
      });
    });
    peerInstance.current = peer;
  }, []);
  useEffect(() => {
    console.log({ video });
    if (userStream)
      userStream.getVideoTracks().forEach((t) => (t.enabled = video));
  }, [video]);
  useEffect(() => {
    console.log({ audio });
    if (userStream) {
      userStream.getAudioTracks().forEach((t) => (t.enabled = audio));
    }
  }, [audio]);
  const call = (remotePeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      // currentUserVideoRef.current.play();
      setUserStream(mediaStream);
      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        // remoteVideoRef.current.play();
      });
    });
  };
  function mandarMensaje() {
    if (message !== "") {
      console.log({remotePeerIdValue});
      const conn = peerInstance.current.connect(remotePeerIdValue);
      const msgObj = {
        name: nombre,
        message: message,
      };
      conn.on("open", () => {
        conn.send(msgObj);
      });
      handlers.append({ name: "Tú", message });
      setMessage("");
    }
  }
  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      mandarMensaje();
      return;
    }
  }
  function handleChange(e) {
    setMessage(e.target.value);
  }
  return (
    <Container>
      <h1>Current user id is {peerId}</h1>
      <input
        type="text"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <Container>
        <SimpleGrid
          w="100%"
          breakpoints={[
            { minWidth: "xs", cols: 1 },
            { minWidth: "sm", cols: 2 },
          ]}
        >
          <Box pos="relative" h="100%">
            <video
              className={classes.videoInsert}
              ref={currentUserVideoRef}
              autoPlay
              muted
            />
          </Box>
          <Box pos="relative" h="100%">
            <video
              className={classes.videoInsert}
              ref={remoteVideoRef}
              autoPlay
            />
          </Box>
        </SimpleGrid>
        <Flex gap="md" w="100%" justify="center">
          <ToggleIcon
            activeElement={
              <ControlButtonLlamada
                actionIconProps={{ size: "3em", variant: "filled" }}
              >
                <FaVolumeUp />
              </ControlButtonLlamada>
            }
            desactiveElement={
              <ControlButtonLlamada
                actionIconProps={{ size: "3em", variant: "filled" }}
              >
                <FaVolumeMute />
              </ControlButtonLlamada>
            }
            value={audio}
            onClick={() => {
              toggleAudio();
            }}
          />
          <ToggleIcon
            activeElement={
              <ControlButtonLlamada
                actionIconProps={{ size: "3em", variant: "filled" }}
              >
                <FaVideo />
              </ControlButtonLlamada>
            }
            desactiveElement={
              <ControlButtonLlamada
                actionIconProps={{ size: "3em", variant: "filled" }}
              >
                <FaVideoSlash />
              </ControlButtonLlamada>
            }
            value={video}
            onClick={() => {
              toggleVideo();
            }}
          />
          <ControlButtonLlamada
            actionIconProps={{ size: "3em", variant: "filled", color: "red" }}
          >
            <FaPhoneSlash />
          </ControlButtonLlamada>
        </Flex>
        <Stack>
          <Stack>
            {messages.map(({ message, name }) => (
              <Text>
                {name}:{message}
              </Text>
            ))}
          </Stack>
          <Textarea
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
        </Stack>
      </Container>
    </Container>
  );
}

function ControlButtonLlamada({ actionIconProps, ...props }) {
  return (
    <ActionIcon radius="xl" {...actionIconProps}>
      {props.children}
    </ActionIcon>
  );
}

function ToggleIcon({ activeElement, desactiveElement, value, onClick }) {
  return (
    <UnstyledButton onClick={onClick}>
      {value ? activeElement : desactiveElement}
    </UnstyledButton>
  );
}
