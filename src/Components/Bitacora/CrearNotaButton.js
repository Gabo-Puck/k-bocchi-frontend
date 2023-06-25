import {
  Stack,
  Text,
  Title,
  UnstyledButton,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { AiOutlineFileAdd } from "react-icons/ai";
import { mostrarNotaCrear } from "./MostrarNotasModals";
const useStyles = createStyles((theme) => ({
  botonAgregarNota: {
    padding: theme.spacing.lg,
    color: theme.colors["blue-calm"][5],
    "&:hover": {
      color: theme.colors["blue-calm"][5],
      backgroundColor: theme.colors["blue-calmer"][2],
    },
  },
}));
export default function CrearNotaButton({ setNotas,pacienteId }) {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  return (
    <UnstyledButton
      component={Stack}
      justify="center"
      align="center"
      className={classes.botonAgregarNota}
      onClick={() => {
        mostrarNotaCrear(setNotas,pacienteId);
      }}
    >
      <AiOutlineFileAdd size="2.4em" />
      <Title order={4}>Agregar nota</Title>
    </UnstyledButton>
  );
}
