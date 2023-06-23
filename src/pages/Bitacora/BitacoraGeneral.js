import { Container, Flex, Stack, Title } from "@mantine/core";
import Pacientes from "../../Components/Bitacora/Pacientes";

export default function BitacoraGeneral() {
  return (
    <Container h="100vh" px="xs" py={0} fluid>
      <Flex direction="column" h="100%">
        <Title style={{ flex: "0 0 auto" }}>Bitacora</Title>
        <Pacientes />
      </Flex>
    </Container>
  );
}
