import {
  Button,
  LoadingOverlay,
  ScrollArea,
  Table,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { showNegativeFeedbackNotification } from "../../utils/notificationTemplate";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUsuario } from "../../utils/usuarioHooks";
import FilaProducto from "./FilaProducto";
import { useSm, useXs } from "../../utils/mediaQueryHooks";
import { modals } from "@mantine/modals";
import CrearProducto from "./CrearProducto";

export default function TablaProductos() {
  const [productos, setProductos] = useState();
  let { terapeuta } = useSelector(selectUsuario);
  const big = useSm();

  async function fecthProductos() {
    try {
      let { id: id_terapeuta } = terapeuta;
      let { data } = await axios.get(`/productos/${id_terapeuta}`);
      console.log({ data });
      setProductos(data);
    } catch (err) {
      console.log(err);
      if (err) {
        let {
          response: { data },
        } = err;
        showNegativeFeedbackNotification(data);
      }
    }
  }
  useEffect(() => {
    fecthProductos();
  }, []);
  useEffect(() => {
    console.log({productos});
  }, [productos]);
  function mostrarModalCrearProducto() {
    modals.open({
      title: <Title order={3}>Crear producto</Title>,
      children: (
        <CrearProducto
          onCrear={(producto) => {
            setProductos((ps) => [{ ...producto }, ...ps]);
            modals.closeAll();
          }}
        />
      ),
    });
  }
  if (productos === undefined)
    return <LoadingOverlay visible overlayBlur={2} />;
  return productos.length === 0 ? (
    <div>vacio</div>
  ) : (
    <>
      <Button onClick={mostrarModalCrearProducto} variant="siguiente">
        Añadir producto
      </Button>
      <Table w={big ? "100%" : "130%"}>
        <thead>
          <tr>
            <th></th>
            <th>Producto</th>
            <th>Caracteristicas</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoria</th>
            <th>Vendidos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <FilaProducto producto={producto} key={producto.id}/>
          ))}
        </tbody>
      </Table>
    </>
  );
}
