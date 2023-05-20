import { Center, Modal, Title } from "@mantine/core";

import { FaCheck } from "react-icons/fa";

export default function CorrectModal({ opened, close, ...props }) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      {...props}
      title={
        <Center>
          <FaCheck size="40px" color="green" />
          <Title mx="sm" order={3}>
            ¡Bien!
          </Title>
        </Center>
      }
      centered
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <Center mih="15vh">{props.children}</Center>
    </Modal>
  );
}
