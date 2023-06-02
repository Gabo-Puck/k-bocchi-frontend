import { FaQuestion } from "react-icons/fa";
import ErrorModal from "../../Components/ErrorModal";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDisclosure, useInterval } from "@mantine/hooks";
import { useState } from "react";

import MensajeErrorConexion from "../../Components/MensajeErrorConexion";
import {
  Box,
  Button,
  Center,
  Flex,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { EnabledButton } from "../../Components/DynamicButtons";
import { capitalizeWord, showDato } from "../../utils/capitalizeWord";
import { FISIOTERAPEUTA, PACIENTE } from "../../roles";
import axios from "axios";
import { BACKEND_SERVER } from "../../server";
import CorrectModal from "../../Components/CorrectModal";
import { useSelector } from "react-redux";

const selectUsuarioUid = (state) => state.usuario.uid;
export const saveInfoPaciente = async (data, usuarioUid) => {
  const { email, contrasena } = data;
  const pacienteData = {
    id: usuarioUid || "",
    email: email,
    contrasena: contrasena,
    rol: PACIENTE,
    nombre: `${data.nombre} ${data.apellidos}`,
    telefono: data.telefono,
    paciente: {
      nombre: data.nombre,
      apellidos: data.apellidos,
    },
  };
  console.log(pacienteData);
  try {
    await axios.post(`${BACKEND_SERVER}/usuarios/registrar`, pacienteData);
    return true;
  } catch (error) {
    if (error && error.response && error.response.data) {
      return false;
    }
    if (error && !error.response) {
      console.log(
        "Se nos murio la api o esta mal puesto la direccion del server: ",
        error
      );
      return false;
    }
  }
};

export const saveInfoFisioterapeuta = async (data, usuarioUid) => {
  //No implementado aún
  const { email, contrasena } = data;

  const terapeutaData = {
    id: usuarioUid || "",
    email: email,
    contrasena: contrasena,
    rol: FISIOTERAPEUTA,
    nombre: `${data.nombre} ${data.apellidos}`,
    telefono: data.telefono,
    terapeuta: {
      nombre_del_consultorio: data.nombre_del_consultorio || "",
      pago_minimo: data.pago_minimo,
      pago_maximo: data.pago_maximo,
      servicio_domicilio: data.servicio_domicilio,
      lat: data.coords.lat,
      lng: data.coords.lng,
      numero_cedula: data.numero_cedula,
      domicilio: data.domicilio,
    },
  };
  console.log(terapeutaData);
  try {
    await axios.post(`${BACKEND_SERVER}/usuarios/registrar`, terapeutaData);
    return true;
  } catch (error) {
    if (error && error.response && error.response.data) {
      return false;
    }
    if (error && !error.response) {
      console.log(
        "Se nos murio la api o esta mal puesto la direccion del server: ",
        error
      );
      return false;
    }
  }
  return false;
};

export default function Confirmacion({ anterior, siguiente, saveFunction }) {
  const { datos } = useOutletContext();
  const usuarioUid = useSelector(selectUsuarioUid) || null;
  const [openedError, { open: openError, close: closeError }] =
    useDisclosure(false);
  const [openedSuccess, { open: openSuccess, close: closeSuccess }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingValue, setLoadingValue] = useState(0);
  const interval = useInterval(() => {
    setLoadingValue((v) => {
      if (v >= 100) {
        interval.stop();
        navigate("/");
      }
      return v + 30;
    });
  }, 300);

  // const isMobile = useMediaQuery("(max-width: 50em)");

  const irAtras = () => {
    navigate(anterior);
  };

  const onClick = async () => {
    console.log("");
    setIsLoading(true);
    let result = await saveFunction(datos, usuarioUid);
    setIsLoading(false);
    if (!result) {
      openError();
      return;
    }
    interval.start();
    openSuccess();
  };

  return (
    <>
      <ErrorModal close={closeError} opened={openedError}>
        <MensajeErrorConexion />
      </ErrorModal>
      <CorrectModal
        closeOnEscape={false}
        closeOnClickOutside={false}
        withCloseButton={false}
        close={closeSuccess}
        opened={openedSuccess}
      >
        <Box pos="relative">
          <Text pos="">Se ha guardado correctamente tu registro</Text>
          <Text>Te estamos redirigiendo</Text>
          <Center mt="sm">
            <Loader size="lg" />
          </Center>
        </Box>
      </CorrectModal>
      <Box mx="auto" pos={"relative"}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <Center>
          <ThemeIcon radius="xl" size="xl" color="green-nature">
            <FaQuestion />
          </ThemeIcon>
        </Center>
        <Title order={3} align="center">
          Antes de continuar...
        </Title>
        <Text order={5} align="center" mt="lg" size="lg" color="dimmed">
          Revisa que tus datos esten correctos
        </Text>
        <Stack align="flex-start" spacing="md" mt="lg">
          {Object.keys(datos).map(
            (dato) =>
              !["confirmarContrasena", "contrasena", "coords"].includes(
                dato
              ) && (
                <Stack spacing="xs" w="100%" align="flex-start" key={dato}>
                  <Text
                    fw={500}
                    color="dark"
                    style={{ wordWrap: "break-word", width: "90%" }}
                  >
                    {capitalizeWord(dato).replaceAll("_", " ")}
                  </Text>
                  <Text
                    color="dimmed"
                    pl="md"
                    style={{ wordWrap: "break-word", width: "90%" }}
                  >
                    {showDato(datos[dato])}
                  </Text>
                </Stack>
              )
          )}
        </Stack>
        <Flex justify="space-between" mt="lg">
          <Button onClick={irAtras} color="cyan-opaque.9">
            Atrás
          </Button>
          <EnabledButton onClick={onClick} color="green-nature">
            Guardar
          </EnabledButton>
        </Flex>
      </Box>
    </>
  );
}
