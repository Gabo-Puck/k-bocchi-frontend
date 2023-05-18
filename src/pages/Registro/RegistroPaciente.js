import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Input } from "../../Components/Input";
import Formulario from "../../Components/Formulario";
import { useForm } from "react-hook-form";
import MultiFormulario from "../../Components/MultiFormulario";
import { useFormContext } from "react-hook-form";
import { isFormInvalid } from "../../utils/isFormInvalid";
import { FormProvider } from "react-hook-form";
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
