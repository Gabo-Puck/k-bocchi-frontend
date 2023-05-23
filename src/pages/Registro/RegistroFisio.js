import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {Center,Card} from "@mantine/core"
import { Outlet} from "react-router-dom";
import Input from "../../Components/Input";

export default function RegistroFisio() {
  const usuario = useSelector((state) => state.usuario);
  console.log(usuario);
  const [datos, setDatos] = useState({
    email: usuario.email,
    contrasena: "",
    nombre: "",
    apellidos: "",
    edad: 0,
    telefono: "",
    especialidad: "",
    nombre_del_consultorio: "",
    servicioDomiciolio: "",
    calle: "",
    colonia: "",
    numero_exterior: 0,
  });
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
