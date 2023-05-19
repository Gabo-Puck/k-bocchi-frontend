import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

function RegistroPaciente() {
  const [datos, setDatos] = useState({
    correo: "gesqueda",
    contrasena: "",
    nombre: "",
    apellido: "",
    edad: 0,
    telefono: "",
  });

  return (
    <>
      <h1>Registro paciente</h1>
      <Outlet context={{ setDatos: setDatos, datos: datos }} />
    </>
  );
}

export default RegistroPaciente;
