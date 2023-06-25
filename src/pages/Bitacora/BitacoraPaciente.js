import axios from "axios";
import { useSelector } from "react-redux";
import { selectUsuario } from "../../utils/usuarioHooks";
import { useEffect, useState } from "react";
import { Container, Flex } from "@mantine/core";
import GrupoNotas from "../../Components/Bitacora/GrupoNotas";
import BitacoraPacientePlaceholder from "../../Components/Bitacora/BitacoraPacientePlaceholder";
import Bitacora from "../../Components/Bitacora/Bitacora";
import { useParams } from "react-router-dom";
import { useListState } from "@mantine/hooks";

export default function BitacoraPaciente() {
  const [notas, setNotas] = useState();
  const { id: pacienteId } = useParams();
  const usuario = useSelector(selectUsuario);
  async function fetchNotas() {
    let {
      terapeuta: { id },
    } = usuario;
    try {
      let notas = await axios.get(
        `/notas/terapeuta/${id}?id_paciente=${pacienteId}`
      );
      setNotas(notas.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchNotas();
  }, []);
  return (
    <Container h="100vh" py="lg" fluid>
      <Bitacora notas={notas} setNotas={setNotas} />
    </Container>
  );
}
