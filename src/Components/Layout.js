import { Outlet } from "react-router-dom";
import BarraNavegacion from "./BarraNavegacion";
import { useDispatch, useSelector } from "react-redux";
import { USUARIO_AUTORIZADO } from "../Actions/actionsUsuario";
import { FISIOTERAPEUTA, PACIENTE } from "../roles";


const selectUsuario = (state) => state.usuario;

export default function Layout() {
    const dispatch = useDispatch();
    const user = useSelector(selectUsuario);
    const setPaciente = () =>{
        dispatch({type:USUARIO_AUTORIZADO,payload:{...user,rol:PACIENTE}})
    }
    const setFisio = () =>{
        dispatch({type:USUARIO_AUTORIZADO,payload:{...user,rol:FISIOTERAPEUTA}})
    }
  return (
    <>
      <BarraNavegacion />
      <button onClick={setPaciente}>
        Paciente
      </button>
      <button onClick={setFisio}>
        Fisio
      </button>
      
      <Outlet />
    </>
  );
}
