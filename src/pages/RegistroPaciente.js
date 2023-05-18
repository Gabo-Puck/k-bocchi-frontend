import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Input } from "../Components/Input";
import Formulario from "../Components/Formulario";
import { useForm } from "react-hook-form";
import MultiFormulario from "../Components/MultiFormulario";
import { useFormContext } from "react-hook-form";
import { isFormInvalid } from "../utils/isFormInvalid";
import { FormProvider } from "react-hook-form";

const selectUsuario = (state) => state.usuario;

function RegistroPaciente() {
  const usuario = useSelector(selectUsuario);
  const [pagina, setPagina] = useState(0);
  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    email: usuario.email,
    contrasena: "",
    usuario: usuario,
  });
  let Pasos = [FormDatosLogin, FormDatosGeneralesPaciente];
  return (
    <>
      <h1>Registro paciente</h1>
      {/* <Formulario datos={datos} setDatos={setDatos} element={FormDatosLogin} /> */}

      {Pasos[pagina](datos, setDatos, pagina, setPagina)}
    </>
  );
}

function FormDatosLogin({ datos, setDatos, pagina, setPagina }) {
  // const isGoogle = ({ usuario }) => (usuario.uid ? true : false);
  const methods = useForm();
  
  const {
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const isInvalid = isFormInvalid(inputError);
  // console.log(isGoogle({ ...datos }));
  const onSubmit = (data) => {
    console.log(errors);
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            key={"email"}
            placeholder="Correo"
            // value={datos.email}
            label={"email"}
            id={"labelo"}
            name="email"
          />
          {!datos && (
            <Input
              type="password"
              placeholder="Contraseña"
              key={"emaild"}
              // value={datos.email}
              label={"password"}
              id={"labelo1"}
              name="password"
            />
          )}
          <button type="submit">Siguiente</button>
        </form>
      </FormProvider>
    </div>
  );
}

function FormDatosGeneralesPaciente({
  datos,
  setDatos,
  onSubmit,
  setValidarFormulario,
}) {
  console.log(datos);
  const {
    formState: { errors },
  } = useFormContext();
  // const isInvalid = isFormInvalid(inputError);
  // console.log(isGoogle({ ...datos }));
  if (setValidarFormulario) {
    setValidarFormulario(() => {
      if (errors) return false;
      else return true;
    });
  }
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2" key="DatosGenerales">
        <Input
          label="name"
          type="text"
          id="name"
          placeholder="type your name..."
        />
        <Input
          label="password"
          type="password"
          id="password"
          placeholder="type your password..."
        />
      </div>
    </>
  );
}

export default RegistroPaciente;
