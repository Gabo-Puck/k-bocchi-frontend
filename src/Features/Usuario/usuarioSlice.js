import { USUARIO_AUTORIZADO } from "../../Actions/actionsUsuario";

const initialState = {
  email: "",
  rol: "",
  nombre: "",
  isGmail:false
};

export default function usuarioReducer(state = initialState, action) {
  
  switch (action.type) {
    case USUARIO_AUTORIZADO:
  
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
