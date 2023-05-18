import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../../Components/Input";
import { useNavigate, useOutletContext } from "react-router-dom";
import { isRequired, password_validation } from "../../utils/inputValidation";
export default function DatosIdentificacion({ siguiente,atras }) {
  const { datos, setDatos } = useOutletContext();
  const { correo, contrasena } = datos;
  console.log(datos);
  console.log(correo);
  const methods = useForm();
  const navigate = useNavigate();
  const onSubmitSuccess = (data) => {
    alert(JSON.stringify(datos));
    navigate(siguiente);
  };

  const irAtras = () => {
    navigate(atras);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitSuccess)}>
        <Input
          label={"correo"}
          value={correo}
          name={"correo"}
          placeholder={"Ingresa tu correo"}
          setValue={(value) => {
            console.log(value);
            setDatos({ ...datos, correo: value });
          }}
          validacion={isRequired}
          type={"text"}
          id={"Correo"}
        />
        <Input
          label={"contrasena"}
          name={"contrasena"}
          value={contrasena}
          setValue={(e) => setDatos({ ...datos, contrasena: e })}
          placeholder={"Ingresa tu contraseña"}
          type={"password"}
          validacion={password_validation}
          id={"contraseña"}
        />
        <button onClick={()=>irAtras}>Atras</button>
        <button type="sumbit">Siguiente</button>
      </form>
    </FormProvider>
  );
}
