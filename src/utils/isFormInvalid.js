/**
 * 
 * @param {FieldErrors} err Es el arreglo de objetos de error producidos por la validacion de un formulario
 * @returns True o False dependiendo de si err contiene elementos o no
 */
export const isFormInvalid = err => {
    return Object.keys(err).length > 0
}