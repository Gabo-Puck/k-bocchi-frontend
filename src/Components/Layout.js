import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USUARIO_AUTORIZADO } from "../Actions/actionsUsuario";
import { FISIOTERAPEUTA, PACIENTE } from "../roles";
import {
  AppShell,
  Burger,
  Footer,
  Header,
  MediaQuery,
  NavLink,
  Navbar,
  Title,
  Text,
  useMantineTheme,
  Flex,
  Stack,
  Box,
} from "@mantine/core";
import { useState } from "react";

const selectUsuario = (state) => state.usuario;

function NavLinkBar({ to, label }) {
  return (
    <Navbar.Section className="link">
      <NavLink label={<Link to={to}>{label}</Link>} />
    </Navbar.Section>
  );
}

export default function Layout() {
  const dispatch = useDispatch();
  const user = useSelector(selectUsuario);
  const setPaciente = () => {
    dispatch({ type: USUARIO_AUTORIZADO, payload: { ...user, rol: PACIENTE } });
  };
  const theme = useMantineTheme();
  const setFisio = () => {
    dispatch({
      type: USUARIO_AUTORIZADO,
      payload: { ...user, rol: FISIOTERAPEUTA },
    });
  };
  const [opened, setOpened] = useState(false);
  function BarraNavegacion() {
    return (
      <Navbar
        className="Navbarbar"
        hiddenBreakpoint="sm"
        hidden={!opened}
        width={{ sm: 150, lg: 200 }}
      >
        <Link to="perfil">
          <NavLinkBar label="Registro" to="/registro" />
        </Link>
        <Link to="perfil">
          <NavLinkBar label="Perfil" to="perfil"/>
        </Link>
      </Navbar>
    );
  }

  function FooterApp() {
    return (
      <Footer height="auto" p="xs">
        <Flex justify="flex-end" c="dimmed">
          <Box fz="xs">
            <Text>By K-Bocchi Team</Text>
            <Text>© 2023 K-Bocchi</Text>
          </Box>
        </Flex>
      </Footer>
    );
  }

  function HeaderApp() {
    return (
      <Header height={{ base: 50, md: 70 }} p="md">
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>

          <Text>K-Bocchi</Text>
        </div>
      </Header>
    );
  }
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={<HeaderApp />}
      navbar={<BarraNavegacion />}
      footer={<FooterApp />}
    >
      <Outlet />
    </AppShell>
  );
}
