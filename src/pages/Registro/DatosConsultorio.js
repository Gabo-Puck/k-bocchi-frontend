import { useEffect, useState } from "react";
import {
  isLongitudMinima,
  isNumber,
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
  NumberInput,
  Grid,
} from "@mantine/core";
import { FaCheck, FaLock } from "react-icons/fa";
import { DisabledButton, EnabledButton } from "../../Components/DynamicButtons";
import { useForm } from "@mantine/form";
import { ImCross } from "react-icons/im";
import { modals } from "@mantine/modals";
import { abrirMapa } from "../../Components/Mapa";
import { useSetState } from "@mantine/hooks";

function validacionNombreConsultorio(value) {
  return value.length < 3
    ? "El nombre del consultorio tiene que tener minimo 3 caracteres"
    : null;
}

export function DatosConsultorio({ anterior, siguiente }) {
  const { datos, setDatos } = useOutletContext();
  const navigate = useNavigate();
  const {
    nombre_del_consultorio,
    direccion,
    servicio_domicilio,
    servicio_consultorio,
    coords,
    pago_maximo,
    pago_minimo,
  } = datos;
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDomicilio, setIsDomicilio] = useState(servicio_domicilio);
  const [isConsultorio, setIsConsultorio] = useState(servicio_consultorio);
  const [isRangoCorrecto, setIsRangoCorrecto] = useState(false);
  const [isConsultorioCorrecto, setIsConsultorioCorrecto] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    let isModalidadSeleccionada = isDomicilio || isConsultorio;
    if (isDomicilio && isRangoCorrecto && !isConsultorio) {
      setDisabled(false);
      return;
    }
    if (
      isConsultorio &&
      !isDomicilio &&
      isRangoCorrecto &&
      isConsultorioCorrecto
    ) {
      setDisabled(false);
      return;
    }
    if (
      isDomicilio &&
      isConsultorio &&
      isRangoCorrecto &&
      isConsultorioCorrecto
    ) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  }, [datos]);
  const onSubmitSuccess = async (data) => {
    console.log("DATOS: ", datos);

    navigate(siguiente);
  };

  const onSubmitError = (data) => {
    alert(JSON.stringify(datos));
    navigate(siguiente);
  };
  const irSiguiente = () => {
    navigate(siguiente);
  };
  const irAnterior = () => {
    navigate(anterior)
  };

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
          <RegistroRangoPrecios
            datos={datos}
            setDatos={setDatos}
            setIsCorrecto={setIsRangoCorrecto}
          />
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
          {isConsultorio && (
            <ConsultorioInformacion
              datos={datos}
              setDatos={setDatos}
              setIsCorrecto={setIsConsultorioCorrecto}
            />
          )}
        </Stack>
        <Flex justify="space-between" mt="lg">
          <Button color="green-nature" onClick={irAnterior}>
            Atrás
          </Button>
          {disabled ? (
            <DisabledButton
              
              color="green-nature"
            >
              Siguiente
            </DisabledButton>
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

function ConsultorioInformacion({ datos, setDatos, setIsCorrecto }) {
  const { nombre_del_consultorio, direccion } = datos;
  const form = useForm({
    initialValues: {
      nombre_del_consultorio: nombre_del_consultorio,
    },
    validateInputOnChange: true,
    validate: {
      nombre_del_consultorio: (value) =>
        executeValidation(value, [
          isRequiredValidation,
          validacionNombreConsultorio,
        ]),
    },
  });
  useEffect(() => {
    console.log(form.isValid());
    setDatos({
      ...datos,
      ...form.values,
    });
    if (!form.isValid()) {
      setIsCorrecto(false);
      return;
    }
    if (direccion == "" || direccion == null) {
      setIsCorrecto(false);
      // form.setErrors({
      //   ...form.errors,
      //   nombre_del_consultorio: "Falta seleccionar la direccion",
      // });
      return;
    }
    setIsCorrecto(true);
    form.setErrors({});
  }, [form.values, direccion]);
  return (
    <>
      <TextInput
        label="Nombre del consultorio"
        value={nombre_del_consultorio}
        onChange={(e) => {}}
        {...form.getInputProps("nombre_del_consultorio")}
      />
      <Text color={!direccion?"red.4":"green-nature"}>
        Dirección del consultorio: {direccion || "Aún no se ha seleccionado"}
      </Text>
      <Button
        color="green-nature"
        onClick={() =>
          abrirMapa({
            setDatosLat: ({ coords, direccion }) => {
              setDatos({
                ...datos,
                coords: { ...coords },
                direccion: direccion,
              });
            },
          })
        }
      >
        Añadir dirección
      </Button>
    </>
  );
}

function RegistroRangoPrecios({ datos, setDatos, setIsCorrecto }) {
  let { pago_maximo, pago_minimo } = datos;
  const form = useForm({
    validateInputOnBlur: true,
    validateInputOnChange: true,
    initialValues: {
      pago_maximo: pago_maximo,
      pago_minimo: pago_minimo,
    },
    validate: {
      pago_minimo: (value, values) =>
        executeValidation(value, [
          isRequiredValidation,
          isNumber,
          (value) => {
            if (value >= values.pago_maximo)
              return "El pago minimo no puede ser mayor o igual al pago maximo";
            return null;
          },
        ]),
      pago_maximo: (value, values) =>
        executeValidation(value, [
          isRequiredValidation,
          isNumber,
          (value) => {
            if (value <= values.pago_minimo)
              return "El pago maximo no puede ser menor o igual al pago minimo";
            return null;
          },
        ]),
    },
  });
  useEffect(() => {
    if (form.isDirty()) {
      setDatos({ ...datos, ...form.values });
      setIsCorrecto(!form.validate().hasErrors);
    }
  }, [form.values]);
  return (
    <Center>
      <Grid>
        <Grid.Col span="auto">
          <NumberInput
            label="Pago minimo"
            description="Lo minimo que cobrarías por una cita"
            hideControls
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : "$ "
            }
            {...form.getInputProps("pago_minimo")}
          />
        </Grid.Col>
        <Grid.Col span="auto">
          <NumberInput
            label="Pago maximo"
            description="Lo maximo que cobrarías por una cita"
            hideControls
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : "$ "
            }
            {...form.getInputProps("pago_maximo")}
          />
        </Grid.Col>
      </Grid>
    </Center>
  );
}
