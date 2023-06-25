import axios from "axios";
import { useSelector } from "react-redux";
import { selectUsuario } from "../../utils/usuarioHooks";
import { useEffect, useState } from "react";
import { Container } from "@mantine/core";
import Bitacora from "../../Components/Bitacora/Bitacora";
import { useParams } from "react-router-dom";
import { FormatDate, formatearFecha } from "../../utils/fechas";

export default function BitacoraPaciente() {
  const [notas, setNotas] = useState();
  const { id: pacienteId } = useParams();
  const usuario = useSelector(selectUsuario);
  async function fetchNotas() {
    let {
      terapeuta: { id },
    } = usuario;
    try {
      let { data: notas } = await axios.get(
        `/notas/terapeuta/${id}?id_paciente=${pacienteId}`
      );
      let keys = Object.keys(notas);
      //Checamos si en la respuesta existe una propiedad con la fecha de hoy
      if (!keys.find((k) => formatearFecha(k) === "Hoy")) {
        notas[FormatDate()] = [];
        notas = {
          [FormatDate()]: [],
          ...notas,
        };
      }
      console.log({ notas });
      setNotas(notas);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchNotas();
  }, []);
  return (
    <Container h="100vh" py="lg" fluid>
      <Bitacora notas={notas} setNotas={setNotas} pacienteId={pacienteId} />
    </Container>
  );
}
