import { notifications } from "@mantine/notifications";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { RiSignalWifiErrorLine } from "react-icons/ri";
const defaultMensajeErrorConexion =
  "Estamos experimentando problemas, disculpa 😭. Intenta más tarde";
export const showErrorConexionNotification = (
  mensaje = defaultMensajeErrorConexion
) => {
  notifications.show({
    id: "notificaion-error-net",
    message: mensaje,
    autoClose: 3500,
    icon: <RiSignalWifiErrorLine />,
    color: "red.5",
  });
};

export const updateErrorConexionNotification = (
  mensaje = defaultMensajeErrorConexion
) => {
  notifications.update({
    id: "notificaion-error-net",
    message: mensaje,
    autoClose: 3500,
    icon: <RiSignalWifiErrorLine />,
    color: "red.5",
  });
};

export const showPositiveFeedbackNotification = (mensaje) => {
  notifications.show({
    message: mensaje,
    icon: <FaCheck />,
    color: "green-nature",
    autoClose: 3500,
  });
};
export const showNegativeFeedbackNotification = (mensaje) => {
    notifications.show({
      message: mensaje,
      icon: <ImCross />,
      color: "red",
      autoClose: 3500,
    });
  };
