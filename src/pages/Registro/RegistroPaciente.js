import { Card } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

function RegistroPaciente() {
  const [datos, setDatos] = useState({
    email: "melkor@gmail.com",
    contrasena: "",
    nombre: "",
    apellido: "",
    edad: 0,
    telefono: "",
  });

  return (
    <>
      <h1>Registro paciente</h1>
      <Card shadow="sm" padding="lg" radius="md" maw={320} mx="auto"  withBorder>
        <Outlet context={{ setDatos: setDatos, datos: datos }} />
      </Card>
    </>
  );
}

export default RegistroPaciente;

