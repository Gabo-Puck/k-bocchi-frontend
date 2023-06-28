import { Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import CrearComentario from "./CrearComentario";
import EditarComentario from "./EditarComentario";
import CrearResena from "./CrearResena";
import EditarResena from "./EditarResena";
export const mostrarModalCrearComentario = ({
  setComentarios,
  id_terapeuta,
}) => {
  modals.open({
    title: <Title order={3}>Añadir comentario</Title>,
    children: (
      <CrearComentario
        id_terapeuta={id_terapeuta}
        setComentarios={setComentarios}
      />
    ),
  });
};
export const mostrarModalEditarcomentario = ({
  setComentarios,
  id_terapeuta,
}) => {
  modals.open({
    title: <Title order={3}>Editar comentario</Title>,
    children: (
      <EditarComentario
        id_terapeuta={id_terapeuta}
        setComentarios={setComentarios}
      />
    ),
  });
};

export const mostrarModalCrearResena = ({ setResena, id_terapeuta }) => {
  modals.open({
    title: <Title order={3}>Agregar resena</Title>,
    children: <CrearResena setResena={setResena} id_terapeuta={id_terapeuta} />,
  });
};
export const mostrarModalEditarResena = ({resena, setResena, id_terapeuta }) => {
  modals.open({
    title: <Title order={3}>Editar resena</Title>,
    children: <EditarResena resena={resena} setResena={setResena} id_terapeuta={id_terapeuta} />,
  });
};
