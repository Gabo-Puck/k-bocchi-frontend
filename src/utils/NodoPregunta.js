export default class NodoPregunta {
  constructor(
    anterior,
    siguiente,
    onIncorrecto,
    onCorrecto,
    pregunta,
    onEnvio
  ) {
    this.pregunta = pregunta;
    this.anterior = anterior;
    this.siguiente = siguiente;
    this.onIncorrecto = onIncorrecto;
    this.onCorrecto = onCorrecto;
    this.onEnvio = onEnvio;
  }

  async onSubmit(value) {
    try {
      let respuesta = await this.onEnvio(value);
      this.onCorrecto(respuesta);
    } catch (err) {
      console.log("MISTAKE:",err);
      this.onIncorrecto(err);
    }
  }
}
