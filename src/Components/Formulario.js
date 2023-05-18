import { Children, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Formulario({ datos, setDatos, element,setValidarFormulario }) {
  
  const methods = useForm(); 
  
  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          {element({ datos, setDatos, onSubmit,setValidarFormulario })}
        </form>
      </FormProvider>
    </div>
  );
}
