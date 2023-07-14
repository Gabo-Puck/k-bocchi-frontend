import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUsuario } from "../../utils/usuarioHooks";
import { showNegativeFeedbackNotification } from "../../utils/notificationTemplate";
import { Skeleton } from "@mantine/core";
import { useEffect, useState } from "react";

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
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          merchantId: "*",
          dataMerchantId: data.map(({ merchant_id }) => merchant_id).join(","),
        },
      });
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
  }, []);
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
    />
  ) : (
    <Skeleton w="100%" h="3em" />
  );
}
