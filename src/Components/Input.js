import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormInvalid";

//Recibe
/**
 * - label: Es el contenido de la etiqueta html label del componente
 * - name: Es el valor que permite vincular la etiqueta html label e input.
 * - setValue: setValue es una función que permite vincular el estado del input del componente con
 *             algun valor externo al mismo.
 * - validacion: Es un objeto que contiene las propiedades para validar el input mediante la librería
 *               "react-hook-form"
 *
 */

//Como se usa
/**
 *
 * @param {label} string el contenido de la etiqueta html label del componente
 * @param {name} string el valor que permite vincular la etiqueta html label e input
 * @param {setValue} function es una función que permite vincular el estado del input del componente con algun valor externo al mismo
 * @validacion {setValue}
 * @returns
 */
//Devuelve
function Input({ label, name, setValue, validacion, ...props }) {
  const [controlledValue, setControlledValue] = useState(props.value);
  const { register, formState } = useFormContext();
  const { errors } = formState;
  const { error } = findInputError(errors, name);
  console.log(error);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {error && <InputError message={error.message} />}
      <input
        {...register(name, validacion)}
        {...props}
        value={controlledValue}
        name={name}
        onChange={(e) => {
          setControlledValue(e.target.value);
          setValue(e.target.value);
          console.log(e);
        }}
      />
    </div>
  );
}
const InputError = ({ message }) => {
  return <div>{message}</div>;
};
export default Input;
