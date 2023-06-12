import { MensajeVolver } from "../../Components/Chatbot/MensajeVolver";

export default class NodoPregunta {
  static addMensaje = null;
  static setPregunta = null;
  static opciones = [];
  static NodoInicial = null;
  /**
   * datos = {
   *  cita: citaObject,
   *  terapeuta: terapeutaObject
   * }
   */
  static datos = null;
  static setDatos(dato) {
    this.datos = { ...this.datos, ...dato };
    console.log("Datos changed: ", { ...this.datos });
  }
  constructor(
    anterior,
    siguiente,
    onIncorrecto,
    onCorrecto,
    pregunta,
    onEnvio,
    onInit = () => true
  ) {
    this.pregunta = pregunta;
    this.anterior = anterior;
    this.siguiente = siguiente;
    this.onIncorrecto = onIncorrecto;
    this.onCorrecto = onCorrecto;
    this.onEnvio = onEnvio;
    this.onInit = onInit;
  }
  async onSubmit(value) {
    if(value==="#Volver"){
      NodoPregunta.setPregunta(NodoPregunta.NodoInicial);
      return;
    }
    try {
      
      let respuesta = await this.onEnvio(value);
      this.onCorrecto(respuesta);
    } catch (err) {
      console.log("MISTAKE:", err);
      this.onIncorrecto(err);
      NodoPregunta.addMensaje(<MensajeVolver/>);
    }
  }
}
