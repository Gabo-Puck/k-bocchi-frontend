import { FormatDate } from "../../utils/fechas";

export function addTop(nota, setNotas, grupoPrevio) {
  setNotas((notas) => {
    let notasNew = { ...notas };
    let fecha = FormatDate(nota.fecha_edicion);
    notasNew[grupoPrevio] = notasNew[grupoPrevio].filter(
      (n) => n.id !== nota.id
    );
    notasNew[fecha].unshift(nota);
    return notasNew;
  });
}
export function erase(nota, setNotas) {
  setNotas((notas) => {
    let notasNew = { ...notas };
    let fecha = FormatDate(nota.fecha_edicion);
    notasNew[fecha] = notasNew[fecha].filter((n) => n.id !== nota.id);
    return notasNew;
  });
}
