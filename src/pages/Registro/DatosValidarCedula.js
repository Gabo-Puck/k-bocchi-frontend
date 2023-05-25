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

export function DatosValidarCedula({ anterior, siguiente }) {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setIsDisabled] = useState(true);
  const [urlImagen, setUrlImagen] = useState();
  const [file, setFile] = useState();
  const { datos, setDatos } = useOutletContext();
  const { numero_cedula } = datos;
  const navigate = useNavigate();
  const [isDisabledCedulaFoto, setIsDisabledCedulaFoto] = useState(true);
  const [isValidandoNumCedula, setIsValidandoNumCedula] = useState(false);
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
  useEffect(() => {}, []);
  const irAtras = () => {
    navigate(anterior);
  };
  const irSiguiente = () => {};
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
        notifications.show({
          message: "Ha habido un error, intenta más tarde",
          autoClose: 3500,
          icon: <ImCross />,
          color: "red",
        });
        console.log("ERROR: ", err);
      } else {
        setIsDisabledCedulaFoto(true);
        let mensaje = err.response.data;
        form.setErrors({ numero_cedula: mensaje });
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
            Validar
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
