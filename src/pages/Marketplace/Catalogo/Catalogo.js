import { Container, Stack, Title } from "@mantine/core";
import TablaProductos from "../../../Components/Marketplace/TablaProductos";

export default function Catalogo() {
  return (
    <Container w="100vw" h="100vh">
      <Stack h="100%" w="100%">
        <Title order={3}>Mi catalogo</Title>
        <TablaProductos />
      </Stack>
    </Container>
  );
}
