import { Box, Button, List, Text } from "@mantine/core";
import NodoPregunta from "../../utils/Chatbot/NodoPregunta";
import { useState } from "react";
import { abrirMapa } from "../Mapa";
import {
  PreguntaSeleccionarDomicilio,
  seleccionarUbicacion,
} from "../../utils/Chatbot/Preguntas/PreguntaSeleccionarDomicilio";
import { FormatUTCDateTime } from "../Comentario";

export function MensajeBienvenidaAgendar() {
  return (
    <Box>
      <Text>¡Ok! Agendemos una cita</Text>
    </Box>
  );
}

export function MensajeNombre() {
  return (
    <Box>
      <Text>Porfavor ingresa el nombre completo del terapeuta</Text>
    </Box>
  );
}

export function MensajeSeleccionarTerapeuta({ terapeutas }) {
  console.log(NodoPregunta.opciones);
  return (
    <Box>
      <Text>
        Por favor elige el terapeuta con el que deseas agendar una cita
      </Text>
      <List type="ordered">
        {NodoPregunta.opciones.map((t) => {
          return (
            <List.Item key={`${t.id_usuario}`}>
              <Text>Nombre: {t.usuario.nombre}</Text>
              <Text>Cedula: {t.numero_cedula}</Text>
              <Text>
                Consultorio: {t.nombre_del_consultorio || "Sin consultorio"}
              </Text>
            </List.Item>
          );
        })}
      </List>
    </Box>
  );
}

export function MensajeAvisoVariosTerapeutas() {
  return (
    <Box>
      <Text>Se han encotrado varios terapeutas con nombre similar.</Text>
    </Box>
  );
}

export function MensajeSeleccionarModalidad() {
  let { terapeuta } = NodoPregunta.datos;
  return (
    <Box>
      <Text>Este terapeuta cuenta con las siguientes modalidades:</Text>
      <List type="ordered">
        <List.Item key="consultorio">
          Consultorio: {terapeuta.domicilio}
        </List.Item>
        <List.Item key="domicilio">Domicilio</List.Item>
      </List>
    </Box>
  );
}

export function MensajeSeleccionarDomicilio() {
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(false);
  return (
    <Box>
      {direccionSeleccionada ? (
        <Text>Direccion seleccionada:{direccionSeleccionada}</Text>
      ) : (
        <>
          <Button
            onClick={async () => {
              let domicilio = await seleccionarUbicacion();
              await PreguntaSeleccionarDomicilio.onSubmit(domicilio);
              setDireccionSeleccionada(domicilio.direccion);
            }}
          >
            Seleccionar dirección de la cita
          </Button>
        </>
      )}
    </Box>
  );
}

export function MensajeFechasOpciones({ fechas }) {
  return (
    <Box>
      <Text>
        La fecha seleccionada no esta disponible. Las siguientes opciones son
        las más cercanas a la elegida
      </Text>
      <List type="unordered">
        {fechas.map((t) => {
          return (
            <List.Item key={`${t}`}>
              <Text>{t.split("T")[0]}</Text>
            </List.Item>
          );
        })}
      </List>
    </Box>
  );
}

export function MensajeIngresarFecha() {
  return (
    <Box>
      <Text>
        Ingresa la fecha que deseas agendar tu cita {"(En formato YYYY-mm-dd)"}
      </Text>
    </Box>
  );
}

export function MensajeSeleccionarHorario() {
  return (
    <Box>
      <Text>Estos son los horarios disponibles en la fecha elegida</Text>
    </Box>
  );
}

export function MensajeListaHorarios() {
  let horarios_disponibles = NodoPregunta.opciones;
  //s
  return (
    <Box>
      <List type="ordered">
        {horarios_disponibles.map((t) => {
          return (
            <List.Item key={`${t.horario_formatted}`}>
              <Text>{t.horario_formatted}</Text>
            </List.Item>
          );
        })}
      </List>
    </Box>
  );
}

export function MensajeCitaInformacion() {
  let { cita } = NodoPregunta.datos;
  let { terapeuta } = NodoPregunta.datos;
  return (
    <Box>
      <Text>
        <Text span fw="bold">Fecha: </Text>{FormatUTCDateTime(cita.fecha)}
      </Text>
      <Text>
        <Text span fw="bold">Modalidad: </Text>{cita.modalidad}
      </Text>
      <Text>
        <Text span fw="bold">Domicilio: </Text>{cita.domicilio}
      </Text>
      <Text>
        <Text span fw="bold">Nombre terapeuta: </Text>{terapeuta.usuario.nombre}
      </Text>
      <Text>
        <Text span fw="bold">Cedula terapeuta: </Text>{terapeuta.numero_cedula}
      </Text>
    </Box>
  );
}

export function MensajeCitaConfirmacion() {
  return (
    <Box>
      <Text>¡Perfecto! ¿Deseas guardar la cita?</Text>
      <List type="ordered">
        <List.Item key="consultorio">Si</List.Item>
        <List.Item key="domicilio">No (Volver al menu principal)</List.Item>
      </List>
    </Box>
  );
}
