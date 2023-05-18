import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { FISIOTERAPEUTA, PACIENTE } from "../../roles";
import  Input  from "../../Components/Input";
import Formulario from "../../Components/Formulario";

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
    <Formulario paginas={PaginasFisio} {...datos} datos={datos} setDatos={setDatos}/>
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



