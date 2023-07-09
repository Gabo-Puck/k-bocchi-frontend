import { Box, Button } from "@mantine/core";
import ControlCantidad from "./ControlCantidad";
import { useEffect, useState } from "react";
import {
  showNegativeFeedbackNotification,
  showPositiveFeedbackNotification,
} from "../../utils/notificationTemplate";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUsuario } from "../../utils/usuarioHooks";

export default function BotonAnadirCarrito({
  stock,
  setStock,
  hasStock,
  setHasStock,
  id_producto,
}) {
  const [cantidad, setCantidad] = useState(1);
  const [guardar, setGuardar] = useState(false);
  const {
    paciente: { id: id_paciente },
  } = useSelector(selectUsuario);
  useEffect(() => {
    console.log({ cantidad });
  }, [cantidad]);
  useEffect(() => {
    setCantidad(1);
  }, [stock]);
  async function handleAnadir() {
    let stock;
    setGuardar(true);
    try {
      let { data } = await axios.post("/carrito", {
        id_paciente,
        cantidad,
        id_producto,
      });
      showPositiveFeedbackNotification(
        "Se ha añadido el producto al carrito 🤑"
      );
      stock = data.stock;
      if (stock === 0) setHasStock(0);
      setGuardar(false);
    } catch (err) {
      setGuardar(false);
      if (!err) return;

      if (err.response.status === 500) {
        showNegativeFeedbackNotification(
          "Lo lamentamos, algo ha salido mal 😥"
        );
        return;
      }
      let mensaje;
      let {
        response: { data },
      } = err;

      if (err.response.status === 420) {
        //Ya no hay stock para este producto
        setHasStock(0);
        stock = 0;
        mensaje = "Este producto se encuentra agotado";
      }
      if (err.response.status === 421) {
        //No hay stock suficiente para la cantidad requerida
        mensaje = "No hay stock suficiente";
        stock = data.stock;
      }
      showNegativeFeedbackNotification(mensaje);
    }
    setStock(stock);
  }
  return (
    <Box w="fit-content">
      <ControlCantidad
        mb="sm"
        max={stock}
        onChange={(value) => {
          setCantidad(value);
        }}
        disabled={guardar || !hasStock}
        initialValue={cantidad}
        min={1}
      />
      <Button
        variant="seleccionar"
        disabled={!hasStock}
        w="100%"
        loading={guardar}
        onClick={handleAnadir}
      >
        Añadir al carrito
      </Button>
    </Box>
  );
}
