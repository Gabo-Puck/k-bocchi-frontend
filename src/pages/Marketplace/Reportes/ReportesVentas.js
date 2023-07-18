import { Container, Select, Stack, Tabs, Title } from "@mantine/core";
import { meses, obtenerMes } from "../../../utils/fechas";
import { useState } from "react";
import Graficas from "./Graficas";
import Ventas from "./Ventas";

export default function ReportesVentas() {
  const [mesSeleccionado, setMesSeleccionado] = useState(
    obtenerMes().index.toString()
  );
  console.log({ index: obtenerMes().index });
  return (
    <Container fluid h="100vh">
      <Stack w="100%" h="100%">
        <Title style={{ flex: "0" }}>Reportes</Title>
        <Select
          w="fit-content"
          style={{ flex: "0" }}
          label="Selecciona un mes"
          onChange={setMesSeleccionado}
          value={mesSeleccionado}
          data={meses.map((value, index) => ({
            value: `${index}`,
            label: value,
          }))}
        />
        <Tabs
          defaultValue="grafica"
          keepMounted={false}
          style={{ flex: "1", display: "flex", flexDirection: "column" }}
        >
          <Tabs.List>
            <Tabs.Tab value="grafica">Gráfica</Tabs.Tab>
            <Tabs.Tab value="ventas">Ventas</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel
            value="grafica"
            pt="xs"
            w="100%"
            pos="relative"
            style={{ flex: "1" }}
          >
            <Graficas mes={mesSeleccionado} />
          </Tabs.Panel>

          <Tabs.Panel value="ventas" pt="xs" w="100%" pos="relative">
            <Ventas mes={mesSeleccionado} />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}
