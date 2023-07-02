import { Flex, Group, Stack, Text, createStyles } from "@mantine/core";
import ImagenAvatar from "../ImagenAvatar";
import {
  FormatUTCDate,
  FormatUTCTime,
  formatearFecha,
} from "../../utils/fechas";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  groupContainer: {
    borderBottom: `1px solid ${theme.colors.gray[1]}`,
    padding: theme.spacing.sm,
    ":hover": {
      backgroundColor: theme.colors["blue-calmer"][1],
    },
  },
  activo: {
    backgroundColor: theme.colors["blue-calmer"][1],
  },
  texto: {
    
  },
}));

export default function ListaItem({ chatItem, onClick, selected }) {
  const { classes, cx } = useStyles();
  function handleClick() {
    onClick(chatItem);
  }
  useEffect(() => {
    console.log({ selected });
  }, [selected]);
  return (
    <Group
      w="100%"
      onClick={handleClick}
      className={cx(classes.groupContainer, {
        [classes.activo]: selected && selected.id === chatItem.id,
      })}
    >
      <ImagenAvatar image={chatItem.foto_perfil} />
      <Stack spacing={0} style={{ flex: "1" }}>
        <Text fw="bold" fz="sm" className={classes.texto}>
          {chatItem.nombre}
        </Text>
        <Flex justify="space-between" align="baseline">
          <Text
            truncate
            fw="normal"
            color="dimmed"
            fz="xs"
            // className={classes.texto}
            maw="90%"
            // style={{ flex: "1" }}
          >
            {chatItem.contenido}
          </Text>
          <Text fw="lighter" fz="xs">
            {FormatUTCDate(chatItem.fecha) === FormatUTCDate(new Date())
              ? FormatUTCTime(chatItem.fecha)
              : formatearFecha(chatItem.fecha)}
          </Text>
        </Flex>
      </Stack>
    </Group>
  );
}
