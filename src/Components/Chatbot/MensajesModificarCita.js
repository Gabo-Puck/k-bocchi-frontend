import { List, Text } from "@mantine/core";
import BotMensaje from "./BotMensaje";
import NodoPregunta from "../../utils/Chatbot/NodoPregunta";
import { FormatUTCDateTime } from "../Comentario";

export function MensajeElegirParametro() {

  const { terapeuta } = NodoPregunta.datos;
  return (
    <>
      <BotMensaje>
        <Text>¿Qué quieres cambiar de tu cita?</Text>
        <List type="ordered">
          <List.Item key="parametroFecha">
            <Text>Cambiar fecha</Text>
          </List.Item>
          <List.Item key="parametroHora">
            <Text>Cambiar hora</Text>
          </List.Item>
          <List.Item key="parametroAmbas">
            <Text>Cambiar fecha y hora</Text>
          </List.Item>
          {terapeuta.servicio_domicilio == 1 ? (
            <List.Item key="parametroLugar">
              <Text>Cambiar domicilio</Text>
            </List.Item>
          ) : (
            <></>
          )}
        </List>
      </BotMensaje>
    </>
  );
}

export function MensajeMostrarCitas() {
  const citas = NodoPregunta.opciones;
  return (
    <>
      <BotMensaje>
        <Text>Elige una cita para modificarla</Text>
        <List type="ordered">
          {citas.map((cita) => (
            <List.Item key={`cita-${cita.id}`} mb="sm">
              <Text style={{ wordWrap: "break-word", width: "90%" }}>
                <Text span fw="bold">
                  Domicilio:{" "}
                </Text>
                {cita.domicilio}
              </Text>
              <Text style={{ wordWrap: "break-word", width: "90%" }}>
                <Text span fw="bold">
                  Fecha:{" "}
                </Text>
                {FormatUTCDateTime(cita.fecha)}
              </Text>
              <Text style={{ wordWrap: "break-word", width: "90%" }}>
                <Text span fw="bold">
                  Terapeuta:{" "}
                </Text>
                {cita.terapeuta_datos.usuario.nombre} (
                {cita.terapeuta_datos.numero_cedula})
              </Text>
            </List.Item>
          ))}
        </List>
      </BotMensaje>
    </>
  );
}
export function MensajeModificarBienvenida() {
  return (
    <>
      <BotMensaje>
        <Text>¡Bien! Estas son tus citas proximas</Text>
      </BotMensaje>
    </>
  );
}
