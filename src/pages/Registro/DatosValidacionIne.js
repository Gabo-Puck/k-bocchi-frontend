import {
  Button,
  Image,
  ThemeIcon,
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
import * as faceapi from "face-api.js";
import { notifications } from "@mantine/notifications";
import { MdOutlineVerified } from "react-icons/md";
import { DisabledButton, EnabledButton } from "../../Components/DynamicButtons";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from "axios";
export function DatosValidacionIne({ anterior, siguiente }) {
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isModelsLoading, setIsModelsLoading] = useState(true);
  const [urlImagen, setUrlImagen] = useState();
  const webcamRef = useRef(null);
  const imagenINE = useRef(null);
  const imagenFotoWebcam = useRef(null);

  const [disabled, setDisabled] = useState(true);
  const [urlFoto, setUrlFoto] = useState();
  const net = new faceapi.FaceRecognitionNet();
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
        id: "confirmacion",
        title: <Title order={3}>¡Hola!</Title>,
        labels: { confirm: "Validar", cancel: "Regresar" },
        confirmProps: { color: "green-nature" },
        children: (
          <Stack>
            <Text>Esta es la foto con la que se validará tu INE</Text>
            <Image
              src={urlFoto}
              imageProps={{ onLoad: () => URL.revokeObjectURL(urlImagen) }}
              imageRef={imagenFotoWebcam}
            />
          </Stack>
        ),
        onConfirm: () => {
          modals.close("confirmacion");
          setIsCamaraEnabled(true);
          async function detect() {
            if (!urlFoto) return;
            try {
              let faceDescriptionsINE = await faceapi
                .detectSingleFace(
                  imagenINE.current,
                  new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceDescriptor();
              console.log("INE: ", faceDescriptionsINE);
              if (!faceDescriptionsINE) {
                notifications.update({
                  id: "validar-notificacion",
                  message:
                    "El rostro no se encuentra visible en la INE, intenta con otra foto",
                  color: "red",
                  loading: false,
                  autoClose: 10000,
                  onClose: () => notifications.clean(),
                  withCloseButton: true,
                  icon: <ImCross />,
                });
                setDisabled(true);
                return;
              }

              // const imgIne = await faceapi.fetchImage(urlImagen);
              const newImage = document.createElement("img");
              newImage.src = urlFoto;
              let faceDescriptionsPersona = await faceapi
                .detectSingleFace(
                  newImage,
                  new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceDescriptor();
              console.log("FOTO: ", faceDescriptionsPersona);
              if (!faceDescriptionsPersona) {
                notifications.update({
                  id: "validar-notificacion",
                  message:
                    "El rostro no se encuentra visible en la foto tomada con la webcam, intenta con otra foto",
                  color: "red",
                  loading: false,
                  autoClose: 10000,
                  onClose: () => notifications.clean(),
                  withCloseButton: true,
                  icon: <ImCross />,
                });
                setDisabled(true);
                return;
              }
              setUrlFoto();

              const maxDescriptorDistance = 0.6;
              const euclideanDistance = faceapi.euclideanDistance(
                faceDescriptionsINE.descriptor,
                faceDescriptionsPersona.descriptor
              );
              if (euclideanDistance <= 0.49) {
                console.log("valido");
                setIsCamaraEnabled(false);
                notifications.update({
                  id: "validar-notificacion",
                  message: "Identidad validada correctamente!",
                  color: "green-nature",
                  loading: false,
                  autoClose: 10000,
                  onClose: () => notifications.clean(),
                  withCloseButton: true,
                  icon: <FaCheck />,
                });
                setDisabled(false);
              } else {
                console.log("invalido");
                notifications.update({
                  id: "validar-notificacion",
                  message: "No se ha podido validar tu identidad, no coinciden los rostros en la INE y la foto tomada de la webcam",
                  color: "red",
                  loading: false,
                  autoClose: 10000,
                  onClose: () => notifications.clean(),
                  withCloseButton: true,
                  icon: <ImCross />,
                });
                setDisabled(true);
              }
              // const faceMatcher = new faceapi.FaceMatcher([faceDescriptionsINE.descriptor,faceDescriptionsPersona.descriptor],maxDescriptorDistance);
              console.log(euclideanDistance);
            } catch (err) {
              console.log(err);
              notifications.update({
                id: "validar-notificacion",
                message:
                  "Ha habido un error, intenta de vuelta",
                color: "red",
                loading: false,
                autoClose: 10000,
                onClose: () => notifications.clean(),
                withCloseButton: true,
                icon: <ImCross />,
              });
            }
          }

          detect();
          notifications.show({
            id: "validar-notificacion",
            message: "Estamos validando tu INE, no salgas",
            color: "blue-calm",
            loading: true,
            autoClose: false,
            withCloseButton: false,
          });
        },
      });
  }, [urlFoto]);

  useEffect(() => {
    async function fetchModels() {
      // faceapi
      //   .loadFaceRecognitionModel("./models")
      //   .then(() => console.log("done"))
      //   .catch((e) => console.log(e));
      console.log(process.env.PUBLIC_URL);
      try {
        await faceapi.loadFaceRecognitionModel(
          process.env.PUBLIC_URL + "/models"
        );
        await faceapi.loadFaceDetectionModel(
          process.env.PUBLIC_URL + "/models"
        );
        await faceapi.loadFaceLandmarkModel(process.env.PUBLIC_URL + "/models");
        await faceapi.loadTinyFaceDetectorModel(
          process.env.PUBLIC_URL + "/models"
        );

        console.log("done");
      } catch (err) {
        console.log(err);
      }
      // const res = await axios.get(
      //   "./models/face_recognition_model-weights_manifest.json",
      //   { responseType: "arraybuffer" }
      // );

      // const weights = new Float32Array(res.data);
      // net.load(weights);
      // setIsModelsLoading(false);
    }
    fetchModels();
  }, []);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrlFoto(imageSrc);
  }, [webcamRef]);
  useEffect(() => {}, [urlFoto]);
  const [isCamaraEnabled, setIsCamaraEnabled] = useState(false);

  return (
    <Stack pos="relative">
      <img src={urlFoto} />
      {/* <LoadingOverlay visible={isModelsLoading}> */}
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
                imageRef={imagenINE}
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
      {/* </LoadingOverlay> */}
    </Stack>
  );
}
