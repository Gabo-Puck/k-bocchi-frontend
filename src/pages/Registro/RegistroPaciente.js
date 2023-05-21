import { Card, Center, Container } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";


const selectUsuario = (state) => state.usuario

function RegistroPaciente() {
  const usuario = useSelector((state)=>state.usuario);
  console.log(usuario)
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
