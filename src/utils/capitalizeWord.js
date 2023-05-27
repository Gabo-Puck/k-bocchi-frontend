export function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function showDato(dato){
  if(typeof dato =="boolean")
    return dato ? "Si" : "No"
  return dato;
}
