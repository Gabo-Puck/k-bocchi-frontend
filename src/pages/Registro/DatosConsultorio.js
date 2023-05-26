import { useEffect, useState } from "react";
import {
  isRequiredValidation,
  password_validation,
} from "../../utils/inputValidation";
import { executeValidation } from "../../utils/isFormInvalid";

import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Box,
  Center,
  Flex,
  LoadingOverlay,
  TextInput,
  ThemeIcon,
  Title,
  Text,
  Button,
  Group,
  Switch,
  useMantineTheme,
  Stack,
} from "@mantine/core";
import { FaCheck, FaLock } from "react-icons/fa";
import { DisabledButton, EnabledButton } from "../../Components/DynamicButtons";
import { useForm } from "@mantine/form";
import { ImCross } from "react-icons/im";

export function DatosConsultorio({ anterior, siguiente }) {
  const { datos, setDatos } = useOutletContext();
  const navigate = useNavigate();
  const {
    nombre_del_consultorio,
    calle,
    colonia,
    servicioDomicilio,
    servicioConsultorio,
  } = datos;
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDomicilio, setIsDomicilio] = useState(servicioDomicilio);
  const [isConsultorio, setIsConsultorio] = useState(servicioConsultorio);
  const theme = useMantineTheme();
  // const isMobile = useMediaQuery("(max-width: 50em)");

  useEffect(
    () => setDisabled(!(isDomicilio || isConsultorio)),
    [isDomicilio, isConsultorio]
  );
  const onSubmitSuccess = async (data) => {
    console.log("DATOS: ", datos);

    // setIsLoading(false);
    // if (resultado && resultado.response && resultado.response.data) {
    //   form.setErrors({ email: resultado.response.data });
    //   return;
    // }
    // if (resultado && !resultado.response) {
    //   open();
    //   console.log(
    //     "Se nos murio la api o esta mal puesto la direccion del server: ",
    //     resultado
    //   );
    //   return;
    // }

    navigate(siguiente);
  };

  const onSubmitError = (data) => {
    alert(JSON.stringify(datos));
    navigate(siguiente);
  };
  const irSiguiente = () => {};
  const irAnterior = () => {};
  return (
    <>
      <Box mx="auto" pos={"relative"}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <Center>
          <ThemeIcon radius="xl" size="xl" color="green-nature">
            <FaLock color="green-nature" />
          </ThemeIcon>
        </Center>
        <Title align="center" order={3}>
          ¡Continuemos!
        </Title>

        <Text order={5} mt="lg" size="lg" color="dimmed" align="center">
          Ahora, cuentamos acerca de como ofrecerás tus servicios en K-Bocchi
        </Text>
        <Stack mt="lg">
          <SwitchWithIcon
            checked={isDomicilio}
            setChecked={(value) => {
              setIsDomicilio(value);
              setDatos({ ...datos, servicioDomicilio: value });
            }}
            label={"Servicio a domicilio"}
          />
          <SwitchWithIcon
            checked={isConsultorio}
            setChecked={(value) => {
              setIsConsultorio(value);
              setDatos({ ...datos, servicioConsultorio: value });
            }}
            label={"Servicio en consultorio"}
          />
        </Stack>
        <Flex justify="space-between" mt="lg">
          <Button color="green-nature" onClick={irAnterior}>
            Atrás
          </Button>
          {disabled ? (
            <DisabledButton label="Elige por lo menos una modalidad" color="green-nature">Siguiente</DisabledButton>
          ) : (
            <EnabledButton color="green-nature" onClick={irSiguiente}>
              Siguiente
            </EnabledButton>
          )}
        </Flex>
      </Box>
    </>
  );
}

function SwitchWithIcon({ checked, setChecked, label }) {
  const theme = useMantineTheme();
  return (
    <Group position="center">
      <Switch
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        color="teal"
        size="md"
        label={label}
        thumbIcon={
          checked ? (
            <FaCheck
              size="0.8rem"
              color={theme.colors.teal[theme.fn.primaryShade()]}
              stroke={3}
            />
          ) : (
            <ImCross
              size="0.6rem"
              color={theme.colors.red[theme.fn.primaryShade()]}
              stroke={3}
            />
          )
        }
      />
    </Group>
  );
}
