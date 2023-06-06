import { Box, List, Text } from "@mantine/core";
import NodoPregunta from "../../utils/Chatbot/NodoPregunta";

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
      <Text>Por favor elige el terapeuta con el que deseas agendar una cita</Text>
      <List type="ordered">
        {NodoPregunta.opciones.map((t) => {
          return (
            <List.Item key={`${t.id_usuario}`}>
              <Text>Nombre: {t.usuario.nombre}</Text>
              <Text>Cedula: {t.numero_cedula}</Text>
              <Text>Consultorio: {t.nombre_del_consultorio||"Sin consultorio"}</Text>
            </List.Item>
          );
        })}
      </List>
    </Box>
  );
}

export function MensajeAvisoVariosTerapeutas(){
  return (
    <Box>
      <Text>Se han encotrado varios terapeutas con nombre similar.</Text>
    </Box>
  )
}

export function MensajeSeleccionarModalidad(){
  let {terapeuta} = NodoPregunta.datos;
  return (
    <Box>
      <Text>Este terapeuta cuenta con las siguientes modalidades:</Text>
      <List type="ordered">
        <List.Item key="consultorio">Consultorio: {terapeuta.domicilio}</List.Item>
        <List.Item key="domicilio">Domicilio</List.Item>
      </List>
    </Box>
  )
}