import {
  Title,
  Box,
  LoadingOverlay,
  Text,
  ThemeIcon,
  Center,
  Stack,
  Image,
  Flex,
  Button,
  TextInput,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import { FaCheck, FaUserAlt } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { DisabledButton, EnabledButton } from "../../Components/DynamicButtons";
import { useForm } from "@mantine/form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { executeValidation } from "../../utils/isFormInvalid";
import { isRequiredValidation } from "../../utils/inputValidation";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { ImCross } from "react-icons/im";
import {
  showErrorConexionNotification,
  showNegativeFeedbackNotification,
  showPositiveFeedbackNotification,
} from "../../utils/notificationTemplate";

export function DatosValidarCedula({ anterior, siguiente }) {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setIsDisabled] = useState(true);
  const [urlImagen, setUrlImagen] = useState();
  const [file, setFile] = useState();
  const { datos, setDatos } = useOutletContext();
  const { numero_cedula, nombre, apellidos } = datos;
  const navigate = useNavigate();
  const [isDisabledCedulaFoto, setIsDisabledCedulaFoto] = useState(true);
  const [isValidandoNumCedula, setIsValidandoNumCedula] = useState(false);
  const [isValidandoCedulaFoto, setIsValidandoCedulaFoto] = useState(false);
  const form = useForm({
    validateInputOnBlur: true,
    validateInputOnChange: true,
    initialValues: {
      numero_cedula: numero_cedula,
    },
    validate: {
      numero_cedula: (value) =>
        executeValidation(value, [isRequiredValidation]),
    },
  });

  const validarCedulaOCR = async () => {
    setIsValidandoCedulaFoto(true);
    const formData = new FormData();
    let nombreCompleto = `${nombre.trim()} ${apellidos.trim()}`;
    formData.append("imagenCedula", file);
    formData.append("nombre", nombreCompleto);
    formData.append("numeroCedula", numero_cedula);
    try {
      let result = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/utilidades/validarCedulaOCR`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showPositiveFeedbackNotification(
        "Se ha validado correctamente todos tus datos"
      );
      setIsValidandoCedulaFoto(false);
      setIsDisabled(false);
    } catch (err) {
      setIsValidandoCedulaFoto(false);
      console.log(err);
      if (!err.response) {
        showErrorConexionNotification();
        return;
      }
      let mensaje = err.response.data;
      showNegativeFeedbackNotification(mensaje);
      setIsDisabled(true);
    }
  };
  useEffect(() => {
    setIsDisabledCedulaFoto(true);
    setIsDisabled(true);
    setUrlImagen(null);
  }, [numero_cedula]);
  const irAtras = () => {
    navigate(anterior);
  };
  const irSiguiente = () => {
    navigate(siguiente);
  };
  const buscarCedula = async () => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/utilidades/validarCedula`,
        {
          cedula: form.values.numero_cedula,
        }
      );
      notifications.show({
        message: "Se ha encontrado tu cedula!",
        autoClose: 3500,
        icon: <FaCheck />,
        color: "green-nature",
      });
      setIsDisabledCedulaFoto(false);
    } catch (err) {
      if (!err.response) {
        showErrorConexionNotification();
        console.log("ERROR: ", err);
      } else {
        setIsDisabledCedulaFoto(true);
        let mensaje = err.response.data;
        if (err.response.status == 500)
          showNegativeFeedbackNotification(mensaje);
        else form.setErrors({ numero_cedula: mensaje });
      }
    }
    setIsValidandoNumCedula(false);
  };
  useEffect(() => {
    setDatos({ ...datos, ...form.values });
  }, [form.values]);
  return (
    <Stack pos="relative">
      <Box mx="auto" pos={"relative"}>
        <Center>
          <ThemeIcon radius="xl" size="xl" color="green-nature">
            <MdOutlineVerified />
          </ThemeIcon>
        </Center>

        <Title order={3} align="center">
          ¡Perfecto!
        </Title>
        <Text order={5} align="center" mt="lg" size="lg" color="dimmed">
          Ahora tenemos que validar tu información profesional
        </Text>
        <Stack mt="lg">
          <TextInput
            description="Tenemos que validar la existencia de tu cedula"
            label="Numero de cedula"
            placeholder="00000000"
            mt="lg"
            disabled={isValidandoNumCedula}
            withAsterisk
            {...form.getInputProps("numero_cedula")}
          />
          <Button
            loading={isValidandoNumCedula}
            onClick={() => {
              setIsValidandoNumCedula(true);
              buscarCedula();
            }}
            color="green-nature"
          >
            Buscar
          </Button>
          {!isDisabledCedulaFoto && (
            <>
              <Text color="dimmed">
                Sube una foto de tu cedula para poder validarla con los datos
                que has ingresado
              </Text>
              <Dropzone
                accept={IMAGE_MIME_TYPE}
                onDrop={([file]) => {
                  console.log(file);
                  setFile(file);
                  setUrlImagen(URL.createObjectURL(file));
                }}
                maxFiles={1}
              >
                {urlImagen ? (
                  <Image
                    src={urlImagen}
                    imageProps={{
                      onLoad: () => URL.revokeObjectURL(urlImagen),
                    }}
                  />
                ) : (
                  <Text align="center">Sube una foto de tu cedula</Text>
                )}
              </Dropzone>
              <Button
                loading={isValidandoCedulaFoto}
                onClick={validarCedulaOCR}
                color="green-nature"
                disabled={!urlImagen}
              >
                Validar
              </Button>
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
            <EnabledButton color="green-nature" onClick={irSiguiente}>
              Siguiente
            </EnabledButton>
          )}
        </Flex>
      </Box>
    </Stack>
  );
}
