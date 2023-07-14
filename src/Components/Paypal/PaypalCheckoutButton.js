import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUsuario } from "../../utils/usuarioHooks";
import { showNegativeFeedbackNotification } from "../../utils/notificationTemplate";
import { Skeleton, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { modals } from "@mantine/modals";

export default function PaypalCheckoutButton({
  carrito,
  disabled,
  shippingRate,
  addressId,
  costoEnvio,
}) {
  const {
    paciente: { id: id_paciente },
  } = useSelector(selectUsuario);
  const [{ isResolved, isPending, options }, dispatch] =
    usePayPalScriptReducer();

  async function fetchMerchants() {
    try {
      let { data } = await axios.get(`/pagos/see-merchants/${id_paciente}`);
      console.log(data.map(({ merchant_id }) => merchant_id).join(","));
      if (data.length > 1) {
        dispatch({
          type: "resetOptions",
          value: {
            ...options,
            merchantId: "*",
            dataMerchantId: data
              .map(({ merchant_id }) => merchant_id)
              .join(","),
          },
        });
      }
      if (data.length === 1) {
        dispatch({
          type: "resetOptions",
          value: {
            ...options,
            merchantId: data[0].merchant_id,
            dataMerchantId: undefined,
          },
        });
      }
    } catch (err) {
      if (!err) return;
      showNegativeFeedbackNotification(
        "Algo ha salido mal, recarga la página por favor"
      );
      console.log(err);
    }
  }
  useEffect(() => {
    fetchMerchants();
  }, [carrito]);
  return isResolved ? (
    <PayPalButtons
      onInit={(data, actions) => {
        console.log({ DATA: data });
      }}
      onError={(err) => {
        showNegativeFeedbackNotification(
          "Algo ha salido mal, recarga la página por favor"
        );
      }}
      style={{ layout: "horizontal", color: "blue" }}
      disabled={!isResolved || disabled}
      createOrder={(data, actions) =>
        axios
          .post(`/pagos/create-order/${id_paciente}`, {
            addressId,
            costoEnvio,
          })
          .then(({ data }) => data.id)
      }
      onApprove={() => {
        modals.open({
          title: <Title order={3}>Compra completada</Title>,
          children: (
            <Stack>
              <Text>Tu compra se ha completado exitosamente</Text>
              <Text>
                Tus vendedores enviaran tus productos lo más pronto posible
              </Text>
            </Stack>
          ),
        });
      }}
    />
  ) : (
    <Skeleton w="100%" h="3em" />
  );
}
