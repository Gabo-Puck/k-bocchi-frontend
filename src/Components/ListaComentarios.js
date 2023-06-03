import { Stack, Text } from "@mantine/core";
import Comentario from "./Comentario";

export default function ListaComentarios({ comentarios }) {
  return (
    <>
      {comentarios.length === 0 ? (
        <Text>Sin comentarios</Text>
      ) : (
        <Stack spacing="xl">
          {comentarios.map((comentario) => (
            <Comentario comentario={comentario} />
          ))}
        </Stack>
      )}
    </>
  );
}
