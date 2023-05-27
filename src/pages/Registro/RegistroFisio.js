import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Center, Card } from "@mantine/core";
import { Outlet } from "react-router-dom";

export default function RegistroFisio() {
  const usuario = useSelector((state) => state.usuario);
  console.log(usuario);
  const [datos, setDatos] = useState({
    email: usuario.email,
    contrasena: "pepetoro",
    nombre: "Gabriel",
    apellidos: "Esqueda Guzman",
    edad: 0,
    telefono: "3323282931",
    numero_cedula: "669423",
    nombre_del_consultorio: "El tortas",
    servicio_domicilio: false,
    direccion: "Avenida valle de México",
    servicio_consultorio: false,
    coords: { lat: null, lng: null },
    pago_minimo:0,
    pago_maximo:0
    // calle: "",
    // colonia: "",
    // numero_exterior: 0,
  });
  useEffect(() => console.log(datos), [datos]);
  return (
    <>
      <Center mx="center" mih="100vh">
        <Card
          shadow="xl"
          padding="lg"
          radius="md"
          maw="30%"
          miw="320px"
          mx="auto"
          style={{ borderRadius: 0 }}
        >
          <Outlet context={{ setDatos: setDatos, datos: datos }} />
        </Card>
      </Center>
    </>
  );
}
