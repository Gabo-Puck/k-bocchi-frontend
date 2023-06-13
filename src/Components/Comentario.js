import {
  Avatar,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Text,
  Title,
  TypographyStylesProvider,
  createStyles,
  rem,
} from "@mantine/core";
import { Resena } from "./TerapeutaResultado";
const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  },

  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));
export default function Comentario({ comentario }) {
  const { classes, theme } = useStyles();
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar
          src={comentario.comentario_paciente.usuario.foto_perfil || ""}
          alt={comentario.comentario_paciente.usuario.nombre}
          radius="xl"
        />
        <div>
          <Text fz="sm">{comentario.comentario_paciente.usuario.nombre}</Text>
          <Text fz="xs" c="dimmed">
            {FormatUTCDateTime(comentario.fecha)}
          </Text>
          <Resena value={comentario.comentario_paciente.resenas[0].estrellas} />
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: comentario.contenido }}
        />
      </TypographyStylesProvider>
    </Paper>
  );
}

export function FormatUTCDateTime(date) {
  
  let date_comentario = new Date(date);
  
  let formatDay = Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "medium",
    hourCycle: "h23",
    timeZone: "UTC",
  }).format(date_comentario);
  return formatDay;
}

