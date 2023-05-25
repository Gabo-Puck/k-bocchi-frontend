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
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { DisabledButton, EnabledButton } from "../../Components/DynamicButtons";
import { useForm } from "@mantine/form";
import { useOutletContext } from "react-router-dom";
import { executeValidation } from "../../utils/isFormInvalid";
import { isRequiredValidation } from "../../utils/inputValidation";
import axios from "axios";

export function DatosValidarCedula({ anterior, siguiente }) {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setIsDisabled] = useState(true);
  const [urlImagen, setUrlImagen] = useState();
  const [file, setFile] = useState();
  const { datos, setDatos } = useOutletContext();
  const { especialidad, numero_cedula } = datos;
  const [isDisabledCedulaFoto, setIsDisabledCedulaFoto] = useState(true);
  const [isValidandoNumCedula, setIsValidandoNumCedula] = useState(false);
  const form = useForm({
    validateInputOnBlur: true,
    validateInputOnChange: true,
    initialValues: {
      especialidad: especialidad,
      numero_cedula: numero_cedula,
    },
    validate: {
      especialidad: (value) => executeValidation(value, [isRequiredValidation]),
      numero_cedula: (value) =>
        executeValidation(value, [isRequiredValidation]),
    },
  });
  useEffect(() => {
    fetch(
      "https://www.cedulaprofesional.sep.gob.mx/cedula/presidencia/indexAvanzada.action",
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "es-ES,es;q=0.9",
          "cache-control": "max-age=0",
          "sec-ch-ua":
            '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
            "Set-Cookie":"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "no-cors",
        credentials: "include",
      }
    ).then(() => {
      fetch(
        "https://www.cedulaprofesional.sep.gob.mx/cedula/buscaCedulaJson.action",
        {
          headers: {
            accept: "*/*",
            "accept-language": "es-ES,es;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua":
              '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
          referrer:
            "https://www.cedulaprofesional.sep.gob.mx/cedula/presidencia/indexAvanzada.action",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: "json=%7B%22maxResult%22%3A%221000%22%2C%22nombre%22%3A%22%22%2C%22paterno%22%3A%22%22%2C%22materno%22%3A%22%22%2C%22idCedula%22%3A%226091402%22%7D",
          method: "POST",
          mode: "no-cors",
          credentials: "include",
        }
      ).then((res)=>res.json()).then(res=>console.log("RESPONSE CEDULA: ",res)).catch(e=>console.log("Fallo request json",e));
    }).catch(err=>console.log("Fallo request inicial: ",err));
  }, []);
  const irAtras = () => {};
  const irSiguiente = () => {};
  const buscarCedula = async () => {
    await axios.post(
      "https://www.cedulaprofesional.sep.gob.mx/cedula/buscaCedulaJson.action",
      {}
    );
  };
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
            }}
            color="green-nature"
          >
            Validar
          </Button>
          {isDisabledCedulaFoto && (
            <>
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
              <TextInput
                label="Especialidad"
                placeholder=""
                mt="lg"
                withAsterisk
                {...form.getInputProps("especialidad")}
              />
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
