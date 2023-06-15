import {
  USUARIO_AUTORIZADO,
  USUARIO_LOGOUT,
} from "../../Actions/actionsUsuario";

const initialState = {
  email: "",
  rol: "",
  nombre: "",
  isGmail: false,
};

export default function usuarioReducer(state = initialState, action) {
  switch (action.type) {
    case USUARIO_AUTORIZADO:
      return {
        ...action.payload,
      };
    case USUARIO_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
