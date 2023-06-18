import useMantenerSesion from "../utils/mantenerSesionHook";
import useSesionExpiracion from "../utils/sesionHook";

export default function ButtonLogout({ Child }) {
  const { setNull } = useSesionExpiracion();
  const { deleteSesion } = useMantenerSesion();
  return (
    <div
      onClick={() => {
        console.log("Adios");
        setNull();
        deleteSesion();
      }}
    >
      {Child}
    </div>
  );
}
