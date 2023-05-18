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
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro">
            <Route index element={<RegistroDesicion />} />
            <Route path="paciente" element={<RegistroPaciente />}>
              <Route element={<DatosIdentificacion />} path="credenciales" />
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

          <Route path="*" element={<PaginaError />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
