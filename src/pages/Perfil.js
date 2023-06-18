import {
  ScrollArea,
  Text,
  Checkbox,
  Center,
  Table,
  Button,
} from "@mantine/core";

import { useSelector } from "react-redux";
import { selectUsuario } from "../utils/usuarioHooks";
import {
  SimpleGrid,
  Skeleton,
  Container,
  Stack,
  useMantineTheme,
  px,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import ContactIcon from "../Components/InfoPerfil";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import useMantenerSesion from "../utils/mantenerSesionHook";
import { useDebouncedValue, useMediaQuery, randomId } from "@mantine/hooks";
import { FISIOTERAPEUTA, PACIENTE } from "../roles";
import { showNegativeFeedbackNotification } from "../utils/notificationTemplate";
import { ResenaGeneral } from "../Components/ResenaGeneral";
import axios from "axios";
import { useRef } from "react";
import HoraInput from "../Components/Inputs/HoraInput";
import { useFormContext } from "react-hook-form";

export default function Perfil() {
  const theme = useMantineTheme();
  const usuario = useSelector(selectUsuario);
  const horario = useState(null);
  const estrellas = useState(null);
  const big = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  function loadUsuarioFoto() {}
  return (
    <Container h="100vh" fluid>
      <SimpleGrid h="100%" cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
        <Stack spacing="md" my="auto" h="100%" align="center" justify="center">
          <Skeleton
            height={big ? "40vh" : "35vh"}
            width={big ? "40vh" : "35vh"}
            mx="auto"
            radius="50%"
            animate={true}
          />
          <Text ta="center">{usuario.nombre}</Text>
          <EstrellasUsuario />
        </Stack>
        <ScrollArea h="100%" py="md">
          <Stack spacing="md" my="auto" justify="center" h="100%">
            <ContactIcon
              title="Correo"
              description={usuario.email}
              icon={MdAlternateEmail}
            />
            <ContactIcon
              title="Telefono"
              description={usuario.telefono}
              icon={BsFillTelephoneFill}
            />
            <CheckboxMantenerSesion />
            <HorarioUsuario />
          </Stack>
        </ScrollArea>
      </SimpleGrid>
    </Container>
  );
}

function EstrellasUsuario() {
  const usuario = useSelector(selectUsuario);
  const [estrellas, setEstrellas] = useState(undefined);
  useEffect(() => {
    async function fetchEstrellas() {
      if (usuario.rol !== FISIOTERAPEUTA) return;
      try {
        let {
          terapeuta: { id },
        } = usuario;
        let { promedio } = (
          await axios.get(`/usuarios/fisioterapeutas/resenas/${id}`)
        ).data;

        console.log(promedio);
        setEstrellas(promedio);
      } catch (err) {
        if (err) {
          showNegativeFeedbackNotification(
            "No hemos podido cargar tus estrellas 😫"
          );
        }
      }
    }
    fetchEstrellas();
  }, []);
  useEffect(() => {
    console.log(estrellas);
  }, [estrellas]);
  if (usuario.rol === PACIENTE) return null;
  return estrellas === undefined ? (
    <Skeleton //Estrellas
      height="5%"
      width="70%"
      mx="auto"
      radius="md"
      animate={true}
    />
  ) : (
    <Center>
      <ResenaGeneral estrellas={estrellas} />
    </Center>
  );
}
function HorarioUsuario() {
  const usuario = useSelector(selectUsuario);
  const [horario, setHorario] = useState(undefined);
  useEffect(() => {
    async function fetchHorario() {
      if (usuario.rol !== FISIOTERAPEUTA) return;
      try {
        let {
          terapeuta: { id },
        } = usuario;
        let { horario } = (
          await axios.get(`/usuarios/fisioterapeutas/horario/${id}`)
        ).data;

        console.log(horario);
        setHorario(horario);
      } catch (err) {
        if (err) {
          showNegativeFeedbackNotification(
            "No hemos podido cargar tu horario 😫"
          );
        }
      }
    }
    fetchHorario();
  }, []);
  useEffect(() => {
    console.log(horario);
  }, [horario]);
  if (usuario.rol === PACIENTE) return null;
  return horario === undefined ? (
    <Skeleton //Horario
      height="65vh"
      width="70vh"
      mx="auto"
      radius="md"
      animate={true}
    />
  ) : (
    <Center>
      <TablaHorario horario={horario} />
    </Center>
  );
}

function getDiasOrdenados(horario) {
  const dias = [
    { dia: "domingo", output: "Domingo" },
    { dia: "lunes", output: "Lunes" },
    { dia: "martes", output: "Martes" },
    { dia: "miercoles", output: "Miércoles" },
    { dia: "jueves", output: "Jueves" },
    { dia: "viernes", output: "Viernes" },
    { dia: "sabado", output: "Sábado" },
  ];
  const diasOrdenados = dias.map((d, index) => {
    let dia = horario.find((h) => h.dia === d.dia);
    if (!dia) {
      dia = {
        ...dia,
        dia: d.dia,
        isTrabajado: false,
      };
    } else {
      dia = {
        ...dia,
        dia: d.dia,
        hora_inicio: formatFecha(dia.fecha_inicio),
        hora_fin: formatFecha(dia.fecha_inicio),
        isTrabajado: true,
      };
    }
    return { dia, output: d.output };
  });
  return diasOrdenados;
}

function TablaHorario({ horario }) {
  const diasOrdenados = getDiasOrdenados(horario);
  const dias = diasOrdenados.map(({ dia }) => dia);
  console.log({ dias });
  const form = useForm({
    initialValues: {
      horarios: [...dias],
    },
  });
  useEffect(() => {
    console.log({ values: form.values });
  }, [form.values]);

  return (
    <Stack align="end">
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Dia</th>
            <th>Inicio</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody>
          {diasOrdenados.map(({ dia, output }, index) => (
            <FilaTablaHorario
              dia={dia}
              output={output}
              form={form}
              index={index}
            />
          ))}
        </tbody>
      </Table>
      <div>
        <Button variant="guardar">Guardar</Button>
      </div>
    </Stack>
  );
}
function FilaTablaHorario({ dia, output, form, index }) {
  // console.log({ dia });
  return (
    <tr key={output}>
      <td width="10%">
        {
          <Checkbox
            {...form.getInputProps(`horarios.${index}.isTrabajado`, {
              type: "checkbox",
            })}
          />
        }
      </td>
      <td width="30%">{output}</td>
      <td width="30%">
        <HoraInput
          label=""
          value={formatFecha(dia.fecha_inicio)}
          disabled={!dia.isTrabajado}
          inputName={`horarios.${index}.fecha_inicio`}
          form={form}
        />
      </td>
      <td width="30%">
        <HoraInput
          label=""
          value={formatFecha(dia.fecha_fin)}
          disabled={!dia.isTrabajado}
          inputName={`horarios.${index}.fecha_fin`}
          form={form}
        />
      </td>
    </tr>
  );
}
function formatFecha(fecha = "") {
  return fecha.substring(0, 7);
}
function CheckboxMantenerSesion() {
  const { isSesionAbierta, toggleSesionMantener, mantenerSesion } =
    useMantenerSesion();
  const [value, setValue] = useState(isSesionAbierta());
  const [debounced] = useDebouncedValue(value, 200);
  useEffect(() => {
    toggleSesionMantener(debounced);
  }, [debounced]);
  return (
    <Checkbox
      checked={value}
      onChange={({ currentTarget: { checked: value } }) => {
        setValue(value);
      }}
      label="Mantener sesión iniciada"
    />
  );
}
