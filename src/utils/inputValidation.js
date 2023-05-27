/**
 * Este archivo contiene los objetos de validacion para los formularios
 *
 */

import axios from "axios";
import { BACKEND_SERVER } from "../server";

export const isEmailAvailable = async ({email}) => {
  //En caso de encontrar un correo repetido, va a generar una excepcion
  console.log(email);
  try {
    await axios.post(`${BACKEND_SERVER}/usuarios/datos/email`, { email: email });
  } catch (error) {
    return error;
  }
};

export const isPhoneValidation = (value) =>{
  if(!/^\d{10}$/.test(value.toString()))
    return "Un numero de telefono valido tiene 10 digitos"
  return null;
}

export const isNumber = (value) =>{
  if(!/\d$/.test(value))
    return "Este campo tiene que ser un numero"
}

export const isRequiredValidation = (value) => {
  if (!value || value == "") return "Este campo es necesario";
  return null;
};

export const isLongitudMinima = (value,min)=>{
  if(value.length<min) return `Este campo requiere minimo ${min}`
  return null;
}

export const password_validation = (value) => {
  if (value.length < 8)
    return "La contraseña tiene que tener minimo 8 caracteres";

  if (!/[A-Z]/.test(value))
    return "La contraseña debe de tener minimo una mayuscula";

  console.log("x");
  return null;
};

export const email_validation = (value) => {
  if (!/[\w.%+-]+@([\w-]+\.)+[\w-]{2,3}/.test(value))
    return "Correo en formato invalido";
  if (!/[\w.%+-]+@gmail.com$/.test(value))
    return "El correo debe ser del dominio de google (gmail.com)";
};

// export const email_validation = {
//   required: {
//     value: true,
//     message: "Este es un campo obligatorio",
//   },
//   pattern: {
//     value: /^[A-Za-z0-9._%+-]+@google\.com$/,
//     message: "Correo no valido",
//   },
//   validate: {
//     correoExistente: async (value) => {
//       let resultado = await axios.post(
//         `${BACKEND_SERVER}/usuarios/datos/email`,
//         {
//           value,
//         }
//       );
//       return resultado;
//     },
//   },
// };

export const isRequired = {
  required: {
    value: true,
    message: "required",
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "not valid",
    },
  },
};
