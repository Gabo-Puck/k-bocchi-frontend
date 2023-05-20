/**
 *
 * @param {FieldErrors} err Es el arreglo de objetos de error producidos por la validacion de un formulario
 * @returns True o False dependiendo de si err contiene elementos o no
 */
export const isFormInvalid = (err) => {
  return Object.keys(err).length > 0;
};

export const executeValidation = (value, validations) => {
  for (let index = 0; index < validations.length; index++) {
    let result = validations[index](value);
    console.log(result);
    if (result) return result;
  }
  return null;
};
