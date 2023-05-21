import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle, auth } from "../firebase";
import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { USUARIO_AUTORIZADO } from "../Actions/actionsUsuario";
import axios from "axios";
import { BACKEND_SERVER } from "../server";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { executeValidation } from "../utils/isFormInvalid";
import {
  email_validation,
  isRequired,
  isRequiredValidation,
  password_validation,
} from "../utils/inputValidation";

export default function Inicio() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email: "",
      contrasena: "",
    },
    validate: {
      contrasena: (value) =>
        executeValidation(value, [isRequiredValidation, password_validation]),
      email: (value) =>
        executeValidation(value, [isRequiredValidation, email_validation]),
    },
  });
  const getRol = async ({ uid }) =>
    await axios.get(`${BACKEND_SERVER}/usuarios/datos/${uid}`);
  useEffect(() => {
    async function checkLogin() {
      try {
        const result = await getRedirectResult(auth);
        console.log(result);
        if (result) {
          // This is the signed-in user
          const firebaseUser = result.user;
          try {
            const response = (await getRol(firebaseUser)).data;
            const user = { ...response, ...firebaseUser };
            navigate("/app");
            dispatch({ type: USUARIO_AUTORIZADO, payload: user });
          } catch (err) {
            console.log(err);

            navigate("/registro");
            dispatch({
              type: USUARIO_AUTORIZADO,
              payload: { isGmail: true, ...firebaseUser },
            });
          }

          // This gives you a Facebook Access Token.
          // const credential = GoogleAuthProvider.credentialFromResult(auth, result);
          // const token = credential.accessToken;
        }
      } catch (err) {
        console.log(err);
      }
    }
    checkLogin();
  }, []);
  const loginUsuario = async () => {
    if (form.validate().hasErrors) return;
    let { email, contrasena } = form.values;
    try {
      let response = await axios.post(`${BACKEND_SERVER}/usuarios/datos/log`, {
        email: email,
        contrasena: contrasena,
      });
      console.log(response.data);
      dispatch({
        type: USUARIO_AUTORIZADO,
        payload: { ...response.data },
      });
      navigate("/app");
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };
  return (
    <>
      <h1>Bienvenido a K-Bocchi</h1>
      <h2>Plataforma para pacientes y fisioterapeutas</h2>
      <form>
        <TextInput
          placeholder="Escribe tu correo"
          label="Correo"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          placeholder="Escribe tu contraseña"
          label="Contraseña"
          type="password"
          {...form.getInputProps("contrasena")}
        />
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            loginUsuario();
          }}
        >
          Ingresar
        </Button>
      </form>
      <button
        onClick={() => {
          signInWithGoogle();
        }}
      >
        Continuar con google
      </button>
      <p>¿No tienes cuenta?</p>
      <br />
      <div>
        <Link to={"/registro"}>Registrate</Link>
      </div>
    </>
  );
}
