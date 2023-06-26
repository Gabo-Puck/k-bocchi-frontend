import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import Root from "./routes/root";
import Inicio, { fetchUsuario } from "./pages/Inicio";
import { PrivateRoutes } from "./Components/PrivateRoutes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
  BrowserRouter,
} from "react-router-dom";
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
import Confirmacion, {
  saveInfoFisioterapeuta,
  saveInfoPaciente,
} from "./pages/Registro/Confirmacion";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { DatosValidacionIne } from "./pages/Registro/DatosValidacionIne";
import { DatosValidarCedula } from "./pages/Registro/DatosValidarCedula";
import { DatosConsultorio } from "./pages/Registro/DatosConsultorio";
import { ModalsProvider } from "@mantine/modals";
import CambiarContrasena from "./pages/CambiarContrasena";
import LayoutCita from "./pages/Cita/LayoutCita";
import Buscar from "./pages/Cita/Buscar";
import DetallesTerapeuta from "./pages/Cita/DetallesTerapeuta";
import ChatBot from "./pages/Chatbot/Chatbot";
import Chat from "./pages/Chat";
import useSesionExpiracion from "./utils/sesionHook";
import { useDispatch, useSelector } from "react-redux";
import { selectUsuario } from "./utils/usuarioHooks";
import axios from "axios";
import { USUARIO_AUTORIZADO } from "./Actions/actionsUsuario";
import BitacoraGeneral from "./pages/Bitacora/BitacoraGeneral";
import BitacoraTerapeuta from "./pages/Bitacora/BitacoraTerapeuta";
import BitacoraPaciente from "./pages/Bitacora/BitacoraPaciente";

function App() {
  let usuario = useSelector(selectUsuario);
  let dispatch = useDispatch();
  let { isExpirado } = useSesionExpiracion();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        breakpoints:{
          xml: "88em"
        },
        globalStyles: (theme) => ({
          body: {
            backgroundColor: theme.colors.background,
            maxHeight: "100vh",
          },
        }),
        components: {
          Button: {
            styles: (theme, { variant }) => ({
              root: {
                borderRadius: theme.radius.xs,
              },
            }),
            variants: {
              guardar: (theme) => ({
                root: {
                  backgroundColor: theme.colors["blue-calm"][7],
                  color: theme.white,
                  ...theme.fn.hover({
                    backgroundColor: theme.colors["blue-calm"][7],
                  }),
                },
              }),
              siguiente: (theme) => ({
                root: {
                  backgroundColor: theme.colors["green-nature"][8],
                  color: theme.white,
                  ...theme.fn.hover({
                    backgroundColor: theme.colors["green-nature"][9],
                  }),
                },
              }),
              configuracion: (theme) => ({
                root: {
                  backgroundColor: theme.colors["blue-empire"][4],
                  color: theme.white,
                  ...theme.fn.hover({
                    backgroundColor: theme.colors["blue-empire"][5],
                  }),
                },
              }),
              cerrar: (theme) => ({
                root: {
                  backgroundColor: theme.colors["cyan-opaque"][7],
                  color: theme.white,
                  ...theme.fn.hover({
                    backgroundColor: theme.colors["cyan-opaque"][9],
                  }),
                },
              }),
              danger: (theme) => ({
                root: {
                  backgroundColor: theme.colors["red"][6],
                  color: theme.white,
                  ...theme.fn.hover({
                    backgroundColor: theme.colors["red"][7],
                  }),
                },
              }),
            },
          },
          Checkbox: {
            styles: (theme, { variant }) => ({
              input: {
                ":checked": {
                  backgroundColor: theme.colors["green-nature"][5],
                  borderColor: theme.colors["green-nature"][5],
                },
              },
            }),
          },
        },

        colors: {
          background: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
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
          "blue-calmer": [
            "#FDFDFF",
            "#EEF4FF",
            "#DFEBFF",
            "#D2E2FF",
            "#C4DAFF",
            "#B6D2FF",
            "#A9C9FF",
            "#9DC1FF",
            "#90BAFF",
            "#84B2FF",
            "#79ABFF",
          ],
          "green-calm": [
            "#F3FFFA",
            "#E0FFF3",
            "#CEFFEC",
            "#BCFFE5",
            "#ABFFDE",
            "#9AFFD7",
            "#8AFFD1",
            "#7AFFCB",
            "#6BFFC5",
            "#5CFFBF",
            "#4EFFBA",
          ],
        },
      }}
    >
      <ModalsProvider
        modalProps={{
          centered: true,
        }}
      >
        <Notifications />
        <div className="App">
          {/**Router es un componente que permite crear un enrutador para la aplicacion. Además soporta los controles de anterior y siguiente del navegador */}
          <BrowserRouter>
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
                  <Route
                    element={<DatosIdentificacion siguiente="../personal" />}
                    path="credenciales"
                  />
                  <Route
                    element={
                      <DatosBasicos
                        siguiente="../identidad"
                        anterior="../credenciales"
                      />
                    }
                    path="personal"
                  />
                  <Route
                    element={
                      <DatosValidacionIne
                        siguiente="../cedula"
                        anterior="../personal"
                      />
                    }
                    path="identidad"
                  />
                  <Route
                    element={
                      <DatosValidarCedula
                        siguiente="../consultorio"
                        anterior="../identidad"
                      />
                    }
                    path="cedula"
                  />
                  <Route
                    element={
                      <DatosConsultorio
                        siguiente="../confirmacion"
                        anterior="../cedula"
                      />
                    }
                    path="consultorio"
                  />
                  <Route
                    element={
                      <Confirmacion
                        siguiente="/"
                        saveFunction={saveInfoFisioterapeuta}
                        anterior="../consultorio"
                      />
                    }
                    path="confirmacion"
                  />
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
                  {/* TODOS */}
                  <Route path="perfil" element={<Perfil />} />
                  <Route path="chat" element={<Chat />} />
                  <Route path="cita" element={<LayoutCita />}>
                    <Route path="buscar" element={<Buscar />} />
                    <Route
                      path="terapeuta/:id"
                      element={<DetallesTerapeuta />}
                    />
                  </Route>
                  {/* PACIENTE */}
                  <Route
                    path="paciente"
                    element={<PrivateRoutes authRol={[PACIENTE]} />}
                  >
                    <Route path="chatbot" element={<ChatBot />} />
                    <Route path="bitacora">
                      <Route index element={<BitacoraPaciente />} />
                    </Route>
                  </Route>
                  {/* FISIOTERAPEUTA */}
                  <Route
                    path="terapeuta"
                    element={<PrivateRoutes authRol={[FISIOTERAPEUTA]} />}
                  >
                    <Route path="bitacora">
                      <Route index element={<BitacoraGeneral />} />
                      <Route path=":id" element={<BitacoraTerapeuta />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
              {/**Mediante el simbolo '*' podemos indicar que esta elemento se renderiza en cualquier ruta. Al estar al final solo se renderiza
               * cuando el usuario trato de ingresar a una ruta que no existe, por lo tanto se renderiza "PaginaError"
               */}
              <Route
                path="/reestablecerContrasena/:stringEncoded"
                element={<CambiarContrasena />}
              />
              <Route path="*" element={<PaginaError />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
