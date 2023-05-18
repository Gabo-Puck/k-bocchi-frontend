import { Link } from "react-router-dom";

export default function BarraNavegacion() {
    return (
        <nav>
            <Link to="">Home</Link>
            <Link to="perfil">Perfil</Link>
            <Link to="busqueda">Busqueda</Link>
            <Link to="/registro">Registro</Link>
        </nav>
    )
}