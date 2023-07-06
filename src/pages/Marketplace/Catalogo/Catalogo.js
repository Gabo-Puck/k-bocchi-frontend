import { Container, Stack, Title } from "@mantine/core";
import TablaProductos from "../../../Components/Marketplace/TablaProductos";

export default function Catalogo() {
  return (
    <Container maw="100%" p={0} h="100vh">
      <Stack h="100%" w="100%">
        <Title order={3}>Catalogo</Title>
        <TablaProductos />
      </Stack>
    </Container>
  );
}
