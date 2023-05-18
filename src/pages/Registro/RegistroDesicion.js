import { Link } from "react-router-dom";

export default function RegistroDesicion(){
    return (
        <div>
            <h1>¿Qué eres?</h1>
            <Link to="paciente/credenciales"> Paciente</Link>
            <Link to="fisioterapeuta/credenciales">Fisioterapueta</Link>
        </div>
    )
}