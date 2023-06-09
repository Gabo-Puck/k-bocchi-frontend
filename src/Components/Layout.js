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
  Avatar,
  Menu,
  LoadingOverlay,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { socket } from "../socket";
const selectUsuario = (state) => state.usuario;

function NavLinkBar({ to, label }) {
  return (
    <Navbar.Section className="link">
      <NavLink label={<Link to={to}>{label}</Link>} />
    </Navbar.Section>
  );
}

export default function Layout() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const usuario = useSelector(selectUsuario);
  useEffect(() => {
    socket.connect();
    function onConnect() {
      socket.emit("send_data", { id: usuario.id, nombre: usuario.nombre });
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  const dispatch = useDispatch();
  const setPaciente = () => {
    dispatch({
      type: USUARIO_AUTORIZADO,
      payload: { ...usuario, rol: PACIENTE },
    });
  };
  const theme = useMantineTheme();
  const setFisio = () => {
    dispatch({
      type: USUARIO_AUTORIZADO,
      payload: { ...usuario, rol: FISIOTERAPEUTA },
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
          <NavLinkBar label="Perfil" to="perfil" />
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
          <Flex justify="space-between" align="center" w="100%">
            <Text>K-Bocchi</Text>
            <Flex>
              <Link to="/app/cita/buscar">
                <NavLink label="Cita" />
              </Link>
              <Link to="/app/chatbot">
                <NavLink label="Chatbot" />
              </Link>
              <Link to="/app/chat">
                <NavLink label="Chat" />
              </Link>
              <Menu>
                <Menu.Target>
                  <Avatar radius="xl" />
                </Menu.Target>
                <Menu.Dropdown>
                  <Link>
                    <Menu.Item component="li">{usuario.nombre}</Menu.Item>
                  </Link>
                  <Link>
                    <Menu.Item component="li">Salir</Menu.Item>
                  </Link>
                </Menu.Dropdown>
              </Menu>
            </Flex>
          </Flex>
        </div>
      </Header>
    );
  }
  return (
    <>
      <LoadingOverlay visible={!isConnected} overlayBlur={2} />
      <AppShell
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        header={<HeaderApp />}
        mah="100vh"
        mih="100vh"
        // navbar={<BarraNavegacion />}
        // footer={<FooterApp />}
      >
        <Outlet />
      </AppShell>
    </>
  );
}
