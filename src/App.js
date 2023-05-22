import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import Root from "./routes/root";
import Inicio from "./pages/Inicio";
import { PrivateRoutes } from "./Components/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
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
import Confirmacion, { saveInfoPaciente } from "./pages/Registro/Confirmacion";
import DatosValidacion from "./pages/Registro/DatosValidacion";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: (theme) => ({
          body: { backgroundColor: "#fff" },
          
        }),

        colors: {
          background: [
            "#F6F8FA",
            "#F4F6F8",
            "#F2F4F5",
            "#EFF1F3",
            "#EDEFF0",
            "#EBECEE",
            "#E9EAEB",
            "#E6E8E9",
            "#E3E5E8",
            "#E0E3E6",
            "#DCE1E6",
          ],

          "blue-empire": [
            "#8194FF",
            "#7185FD",
            "#6379F6",
            "#576EEE",
            "#4D64E5",
            "#455BDC",
            "#3E54D3",
            "#2943D7",
            "#1F39D3",
            "#1530CE",
            "#0C28C9",
          ],
          "blue-calm": [
            "#AECAFF",
            "#95BAFF",
            "#81ABFF",
            "#719FFA",
            "#6494F3",
            "#5989EB",
            "#4F80E2",
            "#3872E7",
            "#2065ED",
            "#0957F4",
            "#004FF0",
          ],
          "cyan-opaque": [
            "#39FFFF",
            "#26FFFF",
            "#14FFFF",
            "#08FFFF",
            "#04FAF6",
            "#0DE2DF",
            "#15CDCA",
            "#0CC8C5",
            "#03C4C1",
            "#00C1BE",
            "#00B8B5",
          ],
          "green-nature": [
            "#ABFFDE",
            "#92FFD4",
            "#80FEC9",
            "#71F8BF",
            "#64F1B5",
            "#59E9AC",
            "#4FE0A3",
            "#38E49C",
            "#21EB96",
            "#0CF090",
            "#01EB89",
            "#00E782",
            "#00DA7B",
          ],
        },
      }}
    >
      <Notifications/>
      <div className="App">
        {/**Router es un componente que permite crear un enrutador para la aplicacion. Además soporta los controles de anterior y siguiente del navegador */}
        <HashRouter>
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
                <Route
                  element={
                    <DatosBasicos
                      siguiente={"../confirmacion"}
                      anterior={"../credenciales"}
                    />
                  }
                  path="personal"
                />
                <Route
                  element={
                    <Confirmacion
                      anterior={"../personal"}
                      siguiente={"/"}
                      saveFunction={saveInfoPaciente}
                    />
                  }
                  path="confirmacion"
                />
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
        </HashRouter>
      </div>
    </MantineProvider>
  );
}

export default App;
