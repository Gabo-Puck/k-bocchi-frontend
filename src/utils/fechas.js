export function formatearFecha(fecha) {
  const fechaActual = new Date();
  let fechaComparar = new Date(fecha);
  fechaComparar = new Date(
    fechaComparar.getUTCFullYear(),
    fechaComparar.getUTCMonth(),
    fechaComparar.getUTCDate()
  );
  // Obtenemos las fechas sin el componente de tiempo
  const fechaHoy = new Date(
    fechaActual.getFullYear(),
    fechaActual.getMonth(),
    fechaActual.getDate()
  );
  const fechaManana = new Date(fechaHoy);
  fechaManana.setDate(fechaHoy.getDate() + 1);
  const fechaAyer = new Date(fechaHoy);
  fechaAyer.setDate(fechaHoy.getDate() - 1);

  // Comparamos las fechas
  if (fechaComparar.getTime() === fechaHoy.getTime()) {
    return "Hoy";
  } else if (fechaComparar.getTime() === fechaManana.getTime()) {
    return "Mañana";
  } else if (fechaComparar.getTime() === fechaAyer.getTime()) {
    return "Ayer";
  } else if (fechaComparar > fechaAyer && fechaComparar < fechaHoy) {
    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const diaSemana = diasSemana[fechaComparar.getDay()];
    return diaSemana;
  } else {
    // Formateo de fecha sin componente de tiempo
    const opciones = { year: "numeric", month: "long", day: "numeric" };
    return fechaComparar.toLocaleDateString(undefined, opciones);
  }
}

export function FormatUTCDateTime(date) {
  let dt = new Date(date);
  let formatDateTime = Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "medium",
    hourCycle: "h23",
    timeZone: "UTC",
  }).format(dt);
  return formatDateTime;
}
export function FormatUTCTime(date) {
  let t = new Date(date);
  let formatTime = Intl.DateTimeFormat("es-MX", {
    timeStyle: "medium",
    hourCycle: "h23",
    timeZone: "UTC",
  }).format(t);
  return formatTime;
}
export function FormatUTCDate(date) {
  let d = new Date(date);
  let formateDate = Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    hourCycle: "h23",
    timeZone: "UTC",
  }).format(d);
  return formateDate;
}
export function FormatDate(date) {
  let fecha = new Date(date);
  return `${fecha.getUTCFullYear()}-${(fecha.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${fecha.getUTCDate().toString().padStart(2, "0")}`;
}
