import { useState } from "react";
import Formulario from "./Formulario";
import { useFormContext } from "react-hook-form";
import { isFormInvalid } from "../utils/isFormInvalid";
export default function MultiFormulario({ paginas = [], datos, setDatos }) {
  const [pagina, setPagina] = useState(0);
  const numeroPaginas = paginas.length;
  const [validarFormulario, setValidarFormulario] = useState();
  const [errors,setErrors] = useState();
  const sumarPagina = (validar) => {
    let resultado = validarFormulario(); //true o false
    if (!resultado) return;
    if (pagina == numeroPaginas - 1) return;
    setPagina(pagina + 1);
  };
  const restarPagina = () => {
    if (pagina == 0) return;
    setPagina(pagina - 1);
  };

  return (
    <>
      <div>
        {pagina + 1}/{numeroPaginas}
      </div>
      {
        // paginas.map((pagina) =>
        //   Formulario({ datos, setDatos, pagina, setValidarFormulario })
        // );
        // let onSubmit = paginas[pagina].onSubmit
        paginas[pagina]({ datos, setDatos, setValidarFormulario })
      }
      <BotonAtras
        numeroPaginas={numeroPaginas}
        pagina={pagina}
        restarPagina={restarPagina}
      />

      <BotonSiguiente
        numeroPaginas={numeroPaginas}
        pagina={pagina}
        sumarPagina={sumarPagina}
      />
    </>
  );
}

const BotonAtras = ({ numeroPaginas, pagina, restarPagina }) => {
  return (
    <button onClick={restarPagina} disabled={pagina == 0}>
      Atras
    </button>
  );
};

const BotonSiguiente = ({ numeroPaginas, pagina, sumarPagina }) => {
  return <button onClick={sumarPagina}>Siguiente</button>;
};
