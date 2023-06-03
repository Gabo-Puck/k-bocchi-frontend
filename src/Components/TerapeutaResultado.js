import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  Image,
  Rating,
  Stack,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import { FaChair } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));
const numberFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});
const distanceFormatter = new Intl.NumberFormat("es-MX", {
  style: "unit",
  unit: "kilometer",
});
export default function TerapeutaResultado({ usuario }) {
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  return (
    <Card
      maw="300px"
      miw="200px"
      shadow="sm"
      padding="lg"
      withBorder
      radius="md"
      p="md"
      className={classes.card}
    >
      <Card.Section>
        <Image
          src={
            usuario.foto_perfil ||
            "https://album.mediaset.es/eimg/2022/11/08/espana-cantera-de-medicos-de-europa_42d6.png?w=1200"
          }
          alt={"title"}
          height={180}
        />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Stack>
          <Text fz="lg" fw={500}>
            {usuario.nombre}
          </Text>
          <ResenaGeneral terapeuta={usuario.terapeuta} />
        </Stack>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={7} mt={5}>
          {usuario.dist && (
            <Text>
              A{" "}
              <Text fw="bold" span>
                {distanceFormatter.format(usuario.dist)}
              </Text>{" "}
              aprox
            </Text>
          )}
          <BadgeModalidadTrabajo size="md" terapeuta={usuario.terapeuta} />
          <RangoPrecio terapeuta={usuario.terapeuta} />
          <Button
            radius="sm"
            style={{ flex: 1 }}
            color="green-nature"
            mah="30px"
            mih="30px"
            onClick={() => {
              navigate(`/app/cita/terapeuta/${usuario.terapeuta.id}`);
            }}
          >
            Mas información
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}

export function RangoPrecio({ terapeuta, ...props }) {
  return (
    <Text color="dark" fw="bold">
      {`${numberFormatter.format(
        terapeuta.pago_minimo
      )} - ${numberFormatter.format(terapeuta.pago_maximo)}`}
    </Text>
  );
}
export function BadgeModalidadTrabajo({ terapeuta, ...props }) {
  return (
    <Flex w="100%" gap="md" justify="center">
      {terapeuta.servicio_domicilio == 1 ? (
        <Badge {...props} c="green-nature">
          Domicilio
        </Badge>
      ) : (
        <></>
      )}
      {terapeuta.nombre_del_consultorio && (
        <Badge {...props} c="blue-calm">
          Consultorio
        </Badge>
      )}
    </Flex>
  );
}

export function ResenaGeneral({ terapeuta }) {
  return (
    <>
      {terapeuta.resenas.length ? (
        <Resena
          value={terapeuta.resenas[0].promedio}
        />
      ) : (
        <Text>Sin reseñas</Text>
      )}
    </>
  );
}

export function Resena({ value }) {
  return (
    <Rating
      value={value}
      readOnly
      fractions={3}
      size="xs"
      count={10}
      color="green-nature"
    />
  );
}
