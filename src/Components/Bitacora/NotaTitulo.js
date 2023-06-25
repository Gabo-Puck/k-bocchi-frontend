import { Flex, Title } from "@mantine/core";
import { MenuOpciones } from "./MenuOpciones";

export default function NotaTitulo({ nota }) {
    return (
      <Flex w="100%" justify="space-between" align="center">
        <Title order={3}>{nota.titulo}</Title>
        <MenuOpciones nota={nota} />
      </Flex>
    );
  }