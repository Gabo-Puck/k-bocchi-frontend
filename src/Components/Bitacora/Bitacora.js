import BitacoraPaciente from "../../pages/Bitacora/BitacoraPaciente";
import BitacoraPacienteCargada from "./BitacoraPacienteCargada";
import BitacoraPacientePlaceholder from "./BitacoraPacientePlaceholder";

export default function Bitacora({ notas }) {
  if (notas === undefined) return <BitacoraPacientePlaceholder />;
  if (notas.length === 0) return <div>Vacío</div>;
  return <BitacoraPacienteCargada notas={notas} />;
}
