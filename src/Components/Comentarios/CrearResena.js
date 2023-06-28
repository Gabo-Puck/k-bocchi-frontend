import { Button, Center, Flex, Rating, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { Resena } from "../Resena";

export default function CrearResena({ setResena, id_terapeuta }) {
  const [value, setValue] = useState();
  return (
    <Stack>
      <Text ta="center">¿Cuántas estrellas le pones a este terapeuta?</Text>
      <Center>
        <Resena value={value} onChange={setValue} ta={"center"}/>
      </Center>
      <Flex justify="end">
        <Button variant="guardar" disabled={!value}>Guardar</Button>
      </Flex>
    </Stack>
  );
}
