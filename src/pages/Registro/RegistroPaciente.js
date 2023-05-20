import { Card, Center, Container } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

function RegistroPaciente() {
  const [datos, setDatos] = useState({
    email: "melkor@gmail.com",
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
          radius="md"
          maw="30%" miw={350}
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
