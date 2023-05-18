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
import RegistroPaciente from "./pages/RegistroPaciente";
import RegistroDesicion from "./pages/RegistroDesicion";
import RegistroFisio from "./pages/RegistroFisio";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro">
            <Route index element={<RegistroDesicion/>}/>
            <Route path="paciente" element={<RegistroPaciente/>}/>
            <Route path="fisioterapeuta" element={<RegistroFisio/>}/>
          </Route>
          <Route
            path="/app"
            element={<PrivateRoutes authRol={[PACIENTE, FISIOTERAPEUTA]} />}
          >
            <Route path="/app" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="perfil" element={<Perfil />} />
              <Route path="busqueda" element={<PrivateRoutes authRol={[PACIENTE]} redirect={"/app"}/>}>
                <Route index element={<Busqueda/>}/>
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
