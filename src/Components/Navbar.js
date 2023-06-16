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
import { FaBookMedical } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { LinksGroup } from "./NavbarLinksGroup";

import { UserButton } from "./UserButton";

const mockdata = [
  { label: "Buscar terapeuta", icon: MdSearch, to: "/app/cita/buscar" },
  {
    label: "Cita",
    icon: FaBookMedical,
    initiallyOpened: true,
    links: [
      { label: "Agendar", link: "/app/chatbot" },
      { label: "Emergencia", link: "/" },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    maxHeight: "100vh",
    minHeight: "100vh",
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
  },
  hiddenButton: {
    // right: -12,
  },
  hidden: {
    // display:"none",
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
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));
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
            image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            name="Ann Nullpointer"
            email="anullpointer@yahoo.com"
          />
        </Navbar.Section>
      </Navbar>
    </div>
  );
}
