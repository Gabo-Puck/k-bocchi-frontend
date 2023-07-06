import { Container, Title } from "@mantine/core";
import TablaProductos from "../../../Components/Marketplace/TablaProductos";

export default function Catalogo() {
  return (
    <Container fluid p={0}>
      <Title order={3}>Catalogo</Title>
      <TablaProductos/>
    </Container>
  );
}
