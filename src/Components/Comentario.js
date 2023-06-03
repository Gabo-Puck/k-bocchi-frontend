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
            {comentario.fecha}
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

function FormatSqlDateTime(date) {
  const [year, month, day] = [date.split("-")];
  const monthIndex = month - 1; // remember that Date's constructor 2nd param is monthIndex (0-11) not month number (1-12)!
  const newDate = new Date(year, monthIndex, day);
  return newDate.toString();
}