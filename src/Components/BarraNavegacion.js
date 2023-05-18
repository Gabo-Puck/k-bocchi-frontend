import { Link } from "react-router-dom";
import "../css/navbar.css"
export default function BarraNavegacion() {
    return (
        <nav className="navbar">
            <Link className="link" to="">Home</Link>
            <Link className="link" to="perfil">Perfil</Link>
            <Link className="link" to="busqueda">Busqueda</Link>
            <Link className="link" to="/registro">Registro</Link>
        </nav>
    )
}