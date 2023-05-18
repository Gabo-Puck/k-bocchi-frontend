import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const selectUsuario = (state) => state.usuario;

export const PrivateRoutes = ({authRol=[],redirect}) => {
  const usuario = useSelector(selectUsuario);
  console.log("USUARIO:",usuario);
  if(!usuario.uid){
    return <Navigate to="/"/>
  }
  if(!authRol.includes(usuario.rol)){
    return <Navigate to={redirect||"/"}/>
  }
  return <Outlet/>
};
