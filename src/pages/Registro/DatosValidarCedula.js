import {Title,Box,LoadingOverlay,Text,ThemeIcon,Center} from "@mantine/core"
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";

export function DatosValidarCedula({ anterior, siguiente }) {
    const [isLoading,setIsLoading] = useState(false);
  <Box mx="auto" pos={"relative"}>
    <LoadingOverlay visible={isLoading} overlayBlur={2} />
    <Center>
      <ThemeIcon radius="xl" size="xl" color="green-nature">
        <FaUserAlt />
      </ThemeIcon>
    </Center>

    <Title order={3} align="center">
      ¡Ahora cuéntanos sobre ti!
    </Title>
    <Text order={5} align="center" mt="lg" size="lg" color="dimmed">
      Completa los siguientes datos personales
    </Text>
    
  </Box>;
}
