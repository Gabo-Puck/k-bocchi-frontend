import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle, auth } from "../firebase";
import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { USUARIO_AUTORIZADO } from "../Actions/actionsUsuario";
import axios from "axios";
import { BACKEND_SERVER } from "../server";

export default function Inicio() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            dispatch({ type: USUARIO_AUTORIZADO, payload: firebaseUser });
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
    try {
      let response = await axios.post(`${BACKEND_SERVER}/usuarios/datos/log`,{email:email,contrasena:password});
      console.log(response.data);
      dispatch({ type: USUARIO_AUTORIZADO, payload: { ...response.data } });
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
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
        <input
          placeholder="Contrasena"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="button" onClick={(e) => {e.preventDefault(); loginUsuario()}}>Ingresar</button>
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
