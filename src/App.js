import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import Root from "./routes/root";
import Inicio from "./pages/Inicio";
import { PrivateRoutes } from "./Components/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaginaError from "./pages/PaginaError";
import Busqueda from "./pages/Busqueda";
import Perfil from "./pages/Perfil";
import Layout from "./Components/Layout";
import { FISIOTERAPEUTA, PACIENTE } from "./roles";
import RegistroPaciente from "./pages/Registro/RegistroPaciente";
import RegistroDesicion from "./pages/Registro/RegistroDesicion";
import RegistroFisio from "./pages/Registro/RegistroFisio";
import DatosBasicos from "./pages/Registro/DatosBasicos";
import DatosIdentificacion from "./pages/Registro/DatosIdentificacion";
import Confirmacion from "./pages/Registro/Confirmacion";
import DatosValidacion from "./pages/Registro/DatosValidacion";
function App() {
  return (
    <div className="App">
      {/**Router es un componente que permite crear un enrutador para la aplicacion. Además soporta los controles de anterior y siguiente del navegador */}
      <Router>
        {/**Routes permite definir en donde se empezaran a definir las rutas de la aplicacion, asi como la ruta donde empezaran*/}
        <Routes>
          {/**Route es componente que permite asociar una ruta a un componente, de forma que cuando se este en esa ruta se mostrara dicho componente */}
          {/**path indica la ruta y element el componente */}
          <Route path="/" element={<Inicio />} />
          <Route path="/registro">
            {/**Cuando se anidan componentes routes, los componentes route hijos pueden usar rutas relativas
             * de forma que por ejemplo en la ruta de abajo, se renderiza "RegistroPaciente" en /registro/paciente
             */}
            <Route index element={<RegistroDesicion />} />
            <Route path="paciente" element={<RegistroPaciente />}>
              <Route
                element={<DatosIdentificacion siguiente={"../personal"} />}
                path="credenciales"
              />
              <Route element={<DatosBasicos />} path="personal" />
              <Route element={<Confirmacion />} path="confirmacion" />
            </Route>
            <Route path="fisioterapeuta" element={<RegistroFisio />}>
              <Route element={<DatosIdentificacion />} path="credenciales" />
              <Route element={<DatosBasicos />} path="personal" />
              <Route element={<DatosValidacion />} path="profesional" />
              <Route element={<Confirmacion />} path="confirmacion" />
            </Route>
          </Route>
          {/**
           * Para proteger las rutas se utiliza el componente PrivateRoutes. En authRol definimos que roles tienen acceso a cierta ruta
           * con redirect se indica a donde se tiene que redireccionar al usuario en caso de no tener el rol adecuado.
           * Para poder usar "PrivateRoutes" se pasa como componente en la propiedad "element" de un componente Route
           */}
           {/**
            * La ruta app es la ruta donde los usuarios podrán usar la aplicacion como tal
            */}
          <Route
            path="/app"
            element={<PrivateRoutes authRol={[PACIENTE, FISIOTERAPEUTA]} />}
          >
            <Route path="/app" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="perfil" element={<Perfil />} />
              <Route
                path="busqueda"
                element={
                  <PrivateRoutes authRol={[PACIENTE]} redirect={"/app"} />
                }
              >
                <Route index element={<Busqueda />} />
              </Route>
            </Route>
          </Route>
          {/**Mediante el simbolo '*' podemos indicar que esta elemento se renderiza en cualquier ruta. Al estar al final solo se renderiza
           * cuando el usuario trato de ingresar a una ruta que no existe, por lo tanto se renderiza "PaginaError"
           */}
          <Route path="*" element={<PaginaError />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
