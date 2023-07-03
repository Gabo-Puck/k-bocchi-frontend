import {
  Box,
  Flex,
  LoadingOverlay,
  ScrollArea,
  Stack,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import ListaItem from "./ListaItem";
import { useEffect, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  container: {
    borderRight: `1px solid ${theme.colors.gray[3]}`,
    height:"100%"
  },
  buscador: {
    borderBottom: `1px solid ${theme.colors.gray[3]}`,
  },
}));

export default function ListaChats({ chats, onClick, chatItem }) {
  const [chatsResultados, setChatResultados] = useState(chats);
  const [value, setValue] = useDebouncedState("", 350);
  const { classes, cx } = useStyles();
  useEffect(() => {
    if (chatsResultados) {
      setChatResultados((chatsResultados) =>
        chats.filter(({ nombre }) => {
          let r = new RegExp("^" + value.toLowerCase().trim(), "g");
          console.log({ r });
          return r.test(nombre.toLowerCase().trim());
        })
      );
    }
  }, [value]);
  useEffect(() => {
    setChatResultados(chats);
  }, [chats]);
  return (
    <Stack pos="relative" className={classes.container} w="100%">
      {/* <Title order={3}>Chats</Title> */}
      <Box className={classes.buscador}>
        <TextInput
          placeholder="Buscar..."
          defaultValue={value}
          mx="xs"
          my="md"
          onChange={({ currentTarget: { value } }) => {
            setValue(value);
          }}
        />
      </Box>
      <ScrollArea
        w="100%"
        style={{ flex: "1", boxSizing: "border-box" }}
        styles={{
          viewport: {
            width: "100%",
            // backgroundColor:"black"
          },
          root: {
            width: "100%",
            // backgroundColor:"yellow"
          },
        }}
      >
        <Lista chats={chatsResultados} onClick={onClick} selected={chatItem} />
      </ScrollArea>
    </Stack>
  );
}

function Lista({ chats, onClick, selected }) {
  if (!chats) return <LoadingOverlay visible />;
  if (chats.length === 0) return <>Empty</>;
  let chatItems = chats.map((chatItem) => (
    <ListaItem
      key={chatItem.id}
      chatItem={chatItem}
      onClick={onClick}
      selected={selected}
    />
  ));
  return chatItems;
}
