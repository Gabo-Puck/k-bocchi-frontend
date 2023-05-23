import { Card, Center } from "@mantine/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function RegistroPaciente() {
  const usuario = useSelector((state) => state.usuario);
  console.log(usuario);
  const [datos, setDatos] = useState({
    email: usuario.email,
    contrasena: "",
    nombre: "",
    apellidos: "",
    edad: 0,
    telefono: "",
  });

  return (
    <>
      <Center mx="center" mih="100vh">
        <Card
          shadow="xl"
          padding="lg"
          
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

export default RegistroPaciente;
