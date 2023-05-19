/**
 * Este archivo contiene los objetos de validacion para los formularios
 *
 */

import axios from "axios";
import { BACKEND_SERVER } from "../server";

export const name_validation = {
  required: {
    value: true,
    message: "required",
  },
  maxLength: {
    value: 30,
    message: "30 characters max",
  },
};

export const desc_validation = {
  required: {
    value: true,
    message: "required",
  },
  maxLength: {
    value: 200,
    message: "200 characters max",
  },
};

export const password_validation = {
  required: {
    value: true,
    message: "required",
  },
  minLength: {
    value: 8,
    message: "min 8 characters",
    validate:{
      contieneMayuscula: (value) => /([A-Z])/
    }
  },
};

export const num_validation = {
  required: {
    value: true,
    message: "required",
  },
};

export const email_validation = {
  required: {
    value: true,
    message: "Este es un campo obligatorio",
  },
  pattern: {
    value: /^[A-Za-z0-9._%+-]+@google\.com$/,
    message: "Correo no valido",
  },
  validate: {
    correoExistente: async (value) => {
      let resultado = await axios.post(
        `${BACKEND_SERVER}/usuarios/datos/email`,
        {
          value,
        }
      );
      return resultado;
    },
  },
};



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
