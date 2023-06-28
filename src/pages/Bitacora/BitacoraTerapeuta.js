import axios from "axios";
import { useSelector } from "react-redux";
import { selectUsuario } from "../../utils/usuarioHooks";
import { useEffect, useState } from "react";
import { Container } from "@mantine/core";
import Bitacora from "../../Components/Bitacora/Bitacora";
import { useParams } from "react-router-dom";
import { FormatDate, formatearFecha } from "../../utils/fechas";
import GrupoNotas from "../../Components/Bitacora/GrupoNotas";
import NotaPreviewTerapeuta from "../../Components/Bitacora/NotaPreviewTerapeuta";
import CrearNotaButton from "../../Components/Bitacora/CrearNotaButton";


export default function BitacoraTerapeuta() {
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
      
      //Checamos si en la respuesta existe una propiedad con la fecha de hoy
      if (!notas.find(({header}) => formatearFecha(header) === "Hoy")) {
        // notas[FormatDate()] = [];
        notas.unshift({
          header: FormatDate(),
          notas:[]
        })
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
      <Bitacora
        notas={notas}
        crearGrupos={(notas) => {
          return notas.map(({notas,header}) => (
            <GrupoNotas
              grupo={notas}
              header={formatearFecha(header)}
              crearNotas={crearNotas}
            />
          ));
        }}
      />
    </Container>
  );

  //Esta función permite crear las notas de preview para la bitacora de terapeuta
  function crearNotas(encabezado, grupo) {
    let notasCreadas = grupo.map((nota) => (
      <NotaPreviewTerapeuta
        nota={nota}
        setNotas={setNotas}
        pacienteId={pacienteId}
      />
    ));
    if (encabezado === "Hoy") {
      notasCreadas.push(
        <CrearNotaButton setNotas={setNotas} pacienteId={pacienteId} />
      );
    }
    return notasCreadas;
  }
}
