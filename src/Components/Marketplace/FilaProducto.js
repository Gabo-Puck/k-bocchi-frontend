import Imagen from "../Imagen";

export default function FilaProducto({ producto }) {
  return (
    <tr>
      <td width="10%"><Imagen image={producto.imagen}/></td>
      <td width="15%">{producto.nombre}</td>
      <td width="15%">{producto.caracteristicas}</td>
      <td width="15%">{producto.precio}</td>
      <td width="15%">{producto.stock}</td>
      <td width="15%">{producto.categoria}</td>
      <td width="15%"></td>
    </tr>
  );
}
