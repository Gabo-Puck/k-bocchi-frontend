import { Menu, UnstyledButton } from "@mantine/core";
import Imagen from "../Imagen";
import MenuElipse from "../MenuElipse";
import { MdEdit, MdOutlineDelete } from "react-icons/md";

export default function FilaProducto({ producto }) {
  function handleEditar() {}
  function handleEliminar() {}
  return (
    <tr>
      <td width="10%">
        <Imagen image={producto.imagen} />
      </td>
      <td width="14%">{producto.nombre}</td>
      <td width="14%">{producto.caracteristicas}</td>
      <td width="14%">{producto.precio}</td>
      <td width="14%">{producto.stock}</td>
      <td width="14%">{producto.categoria}</td>
      <td width="14%">{producto.cantidad_vendida}</td>
      <td width="6%">
        <MenuElipse>
          <Menu.Item color="blue" icon={<MdEdit />} onClick={handleEditar}>
            Editar
          </Menu.Item>
          <Menu.Item
            color="red"
            icon={<MdOutlineDelete />}
            onClick={handleEliminar}
          >
            Eliminar
          </Menu.Item>
        </MenuElipse>
      </td>
    </tr>
  );
}
