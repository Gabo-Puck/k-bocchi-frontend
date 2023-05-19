import { useState } from "react";

import { useNavigate, useOutletContext } from "react-router-dom";
import { email_validation, isRequired, password_validation } from "../../utils/inputValidation";
export default function DatosIdentificacion({ siguiente,atras }) {
  const { datos, setDatos } = useOutletContext();
  const { correo, contrasena } = datos;
  const onSubmitSuccess = (data) => {
    alert(JSON.stringify(datos));
    navigate(siguiente);
  };

  const irAtras = () => {
    navigate(atras);
  }

  return (
      <form >
        <button onClick={()=>irAtras}>Atras</button>
        <button type="sumbit">Siguiente</button>
      </form>
    
  );
}
