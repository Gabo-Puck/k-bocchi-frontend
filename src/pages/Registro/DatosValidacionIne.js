import {
  Button,
  Image,
  ThemeIcon,
  SimpleGrid,
  Text,
  Center,
  Stack,
  Box,
  LoadingOverlay,
  Title,
  Flex,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useCallback, useRef, useState, useEffect } from "react";
import { modals } from "@mantine/modals";
import Webcam from "react-webcam";
import { notifications } from "@mantine/notifications";
import { MdOutlineVerified } from "react-icons/md";
import { DisabledButton, EnabledButton } from "../../Components/DynamicButtons";
import { FaCheck } from "react-icons/fa";

export function DatosValidacionIne({ anterior, siguiente }) {
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [urlImagen, setUrlImagen] = useState();
  const webcamRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [urlFoto, setUrlFoto] = useState();
  const openAviso = () => {
    if (isCamaraEnabled) return;
    modals.openConfirmModal({
      title: <Title order={3}>¡Hola!</Title>,
      labels: { confirm: "Si", cancel: "No" },
      confirmProps: { color: "green-nature" },
      children: (
        <Text>
          Para poder continuar necesitamos tomar una fotografía con el fin de
          compararla con su INE para validar su identidad. ¿Esta usted de
          acuerdo?
        </Text>
      ),
      onConfirm: () => {
        setIsCamaraEnabled(true);
        notifications.show({
          message: "¡Perfecto! Se esta habilitando su camara",
          autoClose: 3500,
          color: "green-nature",
        });
      },
      onCancel: () => setUrlImagen(),
      closeOnClickOutside: false,
      closeOnEscape: false,
      withCloseButton: false,
    });
  };
  const irAtras = () => {};

  const validar = () => {};
  useEffect(() => {
    if (urlFoto)
      modals.openConfirmModal({
        id:"confirmacion",
        title: <Title order={3}>¡Hola!</Title>,
        labels: { confirm: "Validar", cancel: "Regresar" },
        confirmProps: { color: "green-nature" },
        children: (
          <Stack>
            <Text>Esta es la foto con la que se validará tu INE</Text>
            <Image
              src={urlFoto}
              imageProps={{ onLoad: () => URL.revokeObjectURL(urlImagen) }}
            />
          </Stack>
        ),
        onConfirm: () => {
          modals.close("confirmacion");
          setIsCamaraEnabled(true);
          notifications.show({
            id: "validar-notificacion",
            message: "Estamos validando tu INE, no salgas",
            color: "blue-calm",
            loading: true,
            autoClose: false,
            withCloseButton: false,
          });
          setTimeout(() => {
            notifications.update({
              id: "validar-notificacion",
              color: "green-nature",
              loading: false,
              message:"Hemos validado tu identidad correctamente",
              icon:<FaCheck/>,
              autoClose: 3000,
              withCloseButton: true,
              onClose: () => {
                notifications.clean();
                
              },
            });
          }, 3000);
        },
      });
  }, [urlFoto]);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrlFoto(imageSrc);
  }, [webcamRef]);
  const [isCamaraEnabled, setIsCamaraEnabled] = useState(false);

  return (
    <Stack>
      <Box mx="auto" pos={"relative"}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <Center>
          <ThemeIcon radius="xl" size="xl" color="green-nature">
            <MdOutlineVerified />
          </ThemeIcon>
        </Center>

        <Title order={3} align="center">
          ¡Sigamos!
        </Title>
        <Text order={5} align="center" mt="lg" size="lg" color="dimmed">
          Para brindar mas seguridad a los pacientes, tenemos que validar tu
          identidad
        </Text>
        <Stack mt="lg">
          <Dropzone
            accept={IMAGE_MIME_TYPE}
            onDrop={([file]) => {
              console.log(file);
              setFile(file);
              setUrlImagen(URL.createObjectURL(file));
              openAviso();
            }}
            maxFiles={1}
          >
            {urlImagen ? (
              <Image
                src={urlImagen}
                imageProps={{ onLoad: () => URL.revokeObjectURL(urlImagen) }}
              />
            ) : (
              <Text align="center">Sube tu ine</Text>
            )}
          </Dropzone>
          {isCamaraEnabled && (
            <>
              <Center>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  style={{
                    maxWidth: "90%",
                  }}
                />
              </Center>
              <Center>
                <Button color="green-nature.6" onClick={capture}>
                  Tomar foto
                </Button>
              </Center>
            </>
          )}
        </Stack>
        <Flex justify="space-between" mt="lg">
          <Button onClick={irAtras} color="cyan-opaque.9">
            Atrás
          </Button>
          {disabled ? (
            <DisabledButton color="green-nature">Siguiente</DisabledButton>
          ) : (
            <EnabledButton color="green-nature">Siguiente</EnabledButton>
          )}
        </Flex>
      </Box>
    </Stack>
  );
}
