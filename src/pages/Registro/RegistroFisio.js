import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import  Input  from "../../Components/Input";


const selectUsuario = (state) => state.usuario;

const PaginasFisio = [FormDatosLogin, FormDatosGeneralesFisio];
export default function RegistroFisio() {
  const usuario = useSelector(selectUsuario);
  
  const [rol, setRol] = useState("");
  const [datos,setDatos] = useState({
    nombre:"",
    apellidos:"",
    gmail:usuario,
    correo:""
    
  })
  return (
    <>
    <h1>Registro fisio</h1>
    </>
  )
}

function FormDatosLogin() {
  return (
    <>
      <form>
        <input type="email" placeholder="Correo" />
        <input type="password" placeholder="Contraseña" />
      </form>
    </>
  );
}

function FormDatosGeneralesFisio() {
  return (
    <>
      <form>
        <Input id={"nombre"} label={"Nombre"} type={"text"}/>
        <Input id={"apellidos"} label={"Apellidos"} type={"text"}/>
        <Input id={"edad"} label={"Edad"} type={"number"}/>
        <Input id={"telefono"} label={"Telefono"} type={"phone"}/>
      </form>
    </>
  );
}



