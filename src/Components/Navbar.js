import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  rem,
  Button,
  UnstyledButton,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { MdSearch, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { FaBookMedical, FaComment } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { LinksGroup } from "./NavbarLinksGroup";

import { UserButton } from "./UserButton";
import ButtonLogout from "./ButtonLogout";
import { useSelector } from "react-redux";
import { selectUsuario } from "../utils/usuarioHooks";
import { capitalizeWord } from "../utils/capitalizeWord";
import { FISIOTERAPEUTA, PACIENTE } from "../roles";
import { useNavigate } from "react-router-dom";

const navbarItems = [
  { label: "Buscar terapeuta", icon: MdSearch, to: "/app/cita/buscar" },
  {
    label: "Cita",
    icon: FaBookMedical,
    initiallyOpened: true,
    links: [
      { label: "Agendar", link: "/app/paciente/chatbot" },
      { label: "Emergencia", link: "/" },
    ],
    rol: PACIENTE,
  },
  {
    label: "Bitácora",
    icon: FaBookMedical,
    rol: FISIOTERAPEUTA,
    to: "terapeuta/bitacora",
  },
  {
    label: "Bitácora",
    icon: FaBookMedical,
    rol: PACIENTE,
    to: "paciente/bitacora",
  },
  {
    label: "Chat",
    icon: FaComment,
    to: "/app/chat",
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    maxHeight: "100vh",
    minHeight: "100vh",
    transition: "width 0.3s, flex-basis 0.3s",
  },
  buttonContainer: {
    position: "relative",
    backgroundColor: theme.colors.gray[3],
  },
  showButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: "0",
    transform: "translate(100%, 0)",
    zIndex: 100,
  },
  hiddenButton: {
    // right: -12,
  },
  hidden: {
    // display:"none",
    transition: "width 0.3s, flex-basis 0.3s",
    width: "0 !important",
    flexBasis: 0,
    padding: "0 !important",
    minWidth: "0 !important",
    overflow: "hidden",
  },
  box: {},
  boxTop: {
    backgroundColor: theme.colors.background,
    height: "6px",
    width: "16px",
    borderBottomLeftRadius: "0.4em",
  },
  boxBottom: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: "0.4em",
    height: "6px",
    width: "16px",
  },
  something: {
    borderRadius: "0 38% 38% 0",
    backgroundColor: theme.colors.gray[3],
    height: "16px",
    width: "16px",
  },
  boxCenter: {
    backgroundColor: theme.colors.background,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  navbarContainer: {
    position: "relative",
    minWidth: "1px",
  },
}));

export default function BarraNavegacion() {
  const { classes, cx } = useStyles();
  let ref = useRef(null);
  const [width, setWidth] = useState(280);
  const [value, toggle] = useToggle();
  const usuario = useSelector(selectUsuario);
  const navigate = useNavigate();
  const links = navbarItems.map((item) =>
    item.rol === usuario.rol || item.rol === undefined ? (
      <LinksGroup {...item} key={item.label} />
    ) : null
  );
  useEffect(() => console.log({ value }), [value]);
  return (
    <div className={classes.navbarContainer}>
      <UnstyledButton
        className={cx(classes.showButton, {
          [classes.hiddenButton]: value === true,
        })}
        onClick={() => {
          console.log(ref.current.display);
          toggle();
        }}
      >
        <div className={classes.buttonContainer}>
          <div className={cx(classes.box, classes.boxTop)}></div>
          <div className={cx(classes.box, classes.boxCenter)}>
            <div className={classes.something}>
              {value ? <MdChevronRight /> : <MdChevronLeft />}
            </div>
          </div>
          <div className={cx(classes.boxBottom)}></div>
        </div>
      </UnstyledButton>
      <Navbar
        ref={ref}
        height={800}
        width={{ sm: 280 }}
        display=""
        p="md"
        className={cx(classes.navbar, { [classes.hidden]: value === true })}
      >
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            {/* <Logo width={rem(120)} /> */}
            K-Bocchi
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <UserButton
            image={usuario.foto_perfil}
            name={usuario.nombre}
            email={capitalizeWord(usuario.rol)}
            onClick={() => navigate("/app/perfil")}
          />
          <ButtonLogout Child={<LinksGroup icon={SlLogout} label="Salir" />} />
        </Navbar.Section>
      </Navbar>
    </div>
  );
}
