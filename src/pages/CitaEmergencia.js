import {
  Button,
  Center,
  Container,
  Drawer,
  Flex,
  Group,
  Loader,
  MediaQuery,
  Modal,
  Paper,
  Radio,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import { BusquedaTerapeutaContext } from "../Components/BusquedaTerapeutaContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { MdPersonSearch } from "react-icons/md";
import TerapeutaResultado from "../Components/TerapeutaResultado";
import { modals } from "@mantine/modals";
import Vacio from "../Components/Vacio";
import { showNegativeFeedbackNotification } from "../utils/notificationTemplate";
import MapaComponent, { abrirMapa } from "../Components/Mapa";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { executeValidation } from "../utils/isFormInvalid";
import { isRequiredValidation } from "../utils/inputValidation";
import { FormatDate, FormatDateTime, FormatUTCDateTime } from "../utils/fechas";
import { serializarSearchParams } from "./Cita/Buscar";

// export function CitaEmergencia() {
//   const theme = useMantineTheme();
//   const [value, setValue] = useDebouncedState("", 300);
//   const { setResultados, parametrosBusqueda, setParametrosBusqueda } =
//     useContext(BusquedaTerapeutaContext);
//   let [searchParams, setSearchParams] = useSearchParams();
//   let [buscando, setBuscando] = useState(false);
//   const buscar = async () => {
//     // alert(searchParams);
//     setBuscando(true);
//     try {
//       let response = await axios.get(
//         `/usuarios/fisioterapeutas/buscar?${searchParams}`
//       );
//       setResultados(response.data.resultados);
//     } catch (err) {
//       console.log(err);
//       return;
//     }
//     setBuscando(false);
//   };
//   useEffect(
//     () =>
//       setParametrosBusqueda({
//         ...parametrosBusqueda,
//         nombre: value,
//       }),
//     [value]
//   );
//   return (
//     <>
//       {/* <Flex justify="center" align="center"> */}
//       <TextInput
//         placeholder="Nombre de terapeuta o consultorio ..."
//         w="100%"
//         radius={0}
//         disabled={buscando}
//         onChange={({ target }) => {
//           setValue(target.value);
//         }}
//       />
//       <Button
//         radius={0}
//         color="green-nature"
//         variant="subtle"
//         disabled={buscando}
//         styles={{
//           root: {
//             border: `1px solid ${theme.colors.gray[4]}`,
//             borderLeft: 0,
//           },
//         }}
//         onClick={() => {
//           buscar();
//         }}
//       >
//         {buscando ? (
//           <Loader color="green-nature" size="xs" />
//         ) : (
//           <MdPersonSearch />
//         )}
//       </Button>
//       {/* </Flex> */}
//     </>
//   );
// }

export default function CitaEmergencia() {
  const [resultados, setResultados] = useState([]);
  const [ubicacion, setUbicacion] = useState({
    lat: undefined,
    lng: undefined,
  });
  const [rango, setRango] = useState(5);
  const [fecha, setFecha] = useState([]);
  const [showModal, { open: openModal, close: closeModal }] =
    useDisclosure(true);
  const [modalidad, setModalidad] = useState([]);
  const [cargando, setCargando] = useState(false);
  return (
    <Container h="100vh" mx={0} pt="sm" fluid>
      <Modal
        fullScreen
        title={<Title order={3}>Criterios de búsqueda</Title>}
        onClose={closeModal}
        opened={showModal}
      >
        <Filtros
          ubicacion={ubicacion}
          setUbicacion={setUbicacion}
          rango={rango}
          setRango={setRango}
          fecha={fecha}
          setFecha={setFecha}
          modalidad={modalidad}
          setModalidad={setModalidad}
          cargando={cargando}
          setCargando={setCargando}
        />
      </Modal>
      <Flex direction="column" h="100%" pos="relative">
        <Title>Citas de emergencia</Title>
        <Flex
          direction="column"
          sx={{ justifyContent: "center", flex: "0 0 auto" }}
        >
          <Text>Agrega filtros para realizar una búsqueda</Text>
          <Center miw="70%">
            {/* <MediaQuery smallerThan="md">
                  <BarraBusquedaTerapeuta />
                </MediaQuery> */}
          </Center>
          <Group>
            <Button mt="md" compact color="green-nature" onClick={openModal}>
              Filtros
            </Button>
          </Group>
        </Flex>
        {/* <MediaQuery largerThan="md" styles={{ display: "none" }}>
              </MediaQuery> */}

        <ScrollArea
          h="100%"
          w="100%"
          style={{ flex: "1 1 auto" }}
          styles={{
            viewport: {
              paddingBottom: 0,
            },
          }}
          pos="relative"
        >
          {resultados.length == 0 ? (
            <Vacio
              children={
                <Text ta="center" display="block">
                  No hay resultados
                </Text>
              }
            />
          ) : (
            <MediaQuery smallerThan="md">
              <Flex
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
                gap="lg"
              >
                {resultados.map((terapeuta) => (
                  <TerapeutaResultado usuario={terapeuta} key={terapeuta.id} />
                ))}
              </Flex>
            </MediaQuery>
          )}
        </ScrollArea>
      </Flex>
    </Container>
  );
}
const MODALIDAD_DOMICILIO = "Domicilio";
const MODALIDAD_AMBOS = "Ambos";
const MODALIDAD_CONSULTORIO = "Consultorio";

const useStyles = createStyles((theme) => ({
  textoAgrandar: {
    color: theme.colors["green-nature"][7],
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
}));
function Filtros({
  ubicacion,
  setUbicacion,
  rango,
  setRango,
  fecha,
  setFecha,
  modalidad,
  setModalidad,
  cargando,
  setCargando,
}) {
  const [showMapa, setShowMapa] = useState(false);
  const [showAgrandar, setShowAgrandar] = useState(false);
  const { classes, cx } = useStyles();
  function getUbicacionActual() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUbicacion({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        form.setFieldValue("ubicacion", {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        console.log(pos);
      },
      (err) => {
        showNegativeFeedbackNotification(
          "No se pudo obtener la posición actual"
        );
        console.log(err);
      }
    );
  }
  let timestamp = new Date();
  let fechaActual = new Date(timestamp.setMinutes(timestamp.getMinutes() + 10));
  const form = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      rango,
      fecha: fechaActual,
      modalidad,
      ubicacion,
    },
    validate: {
      fecha: (value) => executeValidation(value, [isRequiredValidation]),
      modalidad: (value) => executeValidation(value, [isRequiredValidation]),
      ubicacion: (value) => executeValidation(value, [isRequiredValidation]),
    },
  });

  async function handleBuscar(values) {
    setCargando(true);
    setShowAgrandar(true);
    let searchObject = {};
    if (values.modalidad === MODALIDAD_CONSULTORIO) {
      searchObject.con_consultorio = "true";
    }
    if (values.modalidad === MODALIDAD_DOMICILIO) {
      searchObject.servicio_domicilio = "true";
    }
    searchObject = { ...searchObject, ...ubicacion };
    searchObject.distancia = values.rango;
    values.fecha = new Date(values.fecha.setSeconds(0));
    searchObject.fecha = FormatDateTime(values.fecha);
    try {
      await axios.get(
        `/citas/emergencia?${serializarSearchParams(searchObject)}`
      );
    } catch (error) {
      console.log(error);
      if (!error) return;
      let {
        response: { data },
      } = error;
      showNegativeFeedbackNotification(data);
    } finally {
      setCargando(false);
    }
  }
  useEffect(() => {
    form.setFieldValue("rango", rango);
  }, [rango]);
  return (
    <form onSubmit={form.onSubmit(handleBuscar)}>
      <Stack>
        <Paper shadow="sm" p="xl" pb="xs" pos="rel">
          <Center>Ubicacion</Center>
          <Stack my="xs">
            <Text fz="xs" ta="center" color="dimmed">
              <Text span>
                Mostrará terapeutas en un area de {rango}
                km.{" "}
              </Text>
              {showAgrandar && (
                <Text
                  span
                  className={classes.textoAgrandar}
                  onClick={() => {
                    setRango(15);
                  }}
                >
                  Aumentar el rango a 15km
                </Text>
              )}
            </Text>
            <Stack>
              <Button color="green-nature" onClick={getUbicacionActual}>
                Ubicación actual
              </Button>
              {!showMapa ? (
                <Button color="green-nature" onClick={() => setShowMapa(true)}>
                  Seleccionar ubicación
                </Button>
              ) : (
                <MapaComponent
                  setDatosLat={({
                    coords: { lat, lng },
                    direccion: domicilio,
                  }) => {
                    setUbicacion({
                      lat,
                      lng,
                    });
                    form.setFieldValue("ubicacion", {
                      lat,
                      lng,
                    });
                    return true;
                  }}
                />
              )}
            </Stack>
          </Stack>
        </Paper>
        <Paper shadow="sm" p="xl" pb="xs" pos="rel">
          <Center>Fecha</Center>
          <Stack my="xs">
            <Text fz="xs" ta="center" color="dimmed">
              Mostrará los terapeutas con disponibilidad esa fecha
            </Text>
            <Stack>
              <DateTimePicker
                valueFormat="DD MMM YYYY HH:mm"
                minDate={new Date()}
                maw={400}
                miw={400}
                modalProps={{
                  zIndex: 1000,
                }}
                dropdownType="modal"
                mx="auto"
                {...form.getInputProps("fecha")}
              />
            </Stack>
          </Stack>
        </Paper>
        <Paper shadow="sm" p="xl" pb="xs" pos="rel">
          <Center>Modalidad</Center>
          <Stack my="xs">
            <Text fz="xs" ta="center" color="dimmed">
              Mostrará los terapeutas con esa modalidad de trabajo
            </Text>
            <Stack>
              <Radio.Group
                value={modalidad || null}
                my="xs"
                {...form.getInputProps("modalidad")}
              >
                <Flex justify="space-around" w="100%">
                  <Radio
                    value={MODALIDAD_DOMICILIO}
                    label={MODALIDAD_DOMICILIO}
                  />
                  <Radio
                    value={MODALIDAD_CONSULTORIO}
                    label={MODALIDAD_CONSULTORIO}
                  />
                  <Radio value={MODALIDAD_AMBOS} label={MODALIDAD_AMBOS} />
                </Flex>
              </Radio.Group>
            </Stack>
          </Stack>
        </Paper>
        <Flex justify="end">
          <Button
            type="submit"
            variant="siguiente"
            loading={cargando}
            disabled={!form.isValid()}
          >
            Buscar
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}
