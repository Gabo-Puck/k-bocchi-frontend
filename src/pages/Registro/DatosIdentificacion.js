import { useEffect, useState } from "react";

import { useNavigate, useOutletContext } from "react-router-dom";
import {
  email_validation,
  isEmailAvailable,
  isRequired,
  isRequiredValidation,
  password_validation,
} from "../../utils/inputValidation";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  Box,
  LoadingOverlay,
  PasswordInput,
  TextInput,
  Button,
  Group,
  Tooltip,
} from "@mantine/core";
import { executeValidation, isFormInvalid } from "../../utils/isFormInvalid";
import { hasInitialValues } from "../../utils/hasInitialValues";
export default function DatosIdentificacion({ siguiente, atras }) {
  const { datos, setDatos } = useOutletContext();
  const navigate = useNavigate();
  const { email, contrasena } = datos;
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email: email,
      contrasena: contrasena,
      confirmarContrasena: contrasena,
    },
    validate: {
      contrasena: (value) =>
        executeValidation(value, [isRequiredValidation, password_validation]),
      email: (value) =>
        executeValidation(value, [isRequiredValidation, email_validation]),
      confirmarContrasena: (value, values) =>
        executeValidation(value, [
          isRequiredValidation,
          password_validation,
          (value) =>
            values.contrasena !== value ? "Las contraseñas no coinciden" : null,
        ]),
    },
  });
  useEffect(() => {
    setDatos({ ...datos, ...form.values });
    if(form.values.confirmarContrasena!=form.values.contrasena)
      form.setErrors({...form.errors, confirmarcontrasena:"Las contraseñas no coinciden"})
    setDisabled(!form.isValid());
  }, [form.values]);
  useEffect(() => hasInitialValues(form), []);

  const onSubmitSuccess = async (data) => {
    console.log("DATOS: ", datos);
    setIsLoading(true);
    let resultado = await isEmailAvailable({ ...data });
    if (resultado) {
      form.setErrors({ email: resultado });
      setIsLoading(false);
      return;
    }
    navigate(siguiente);
  };

  const onSubmitError = (data) => {
    alert(JSON.stringify(datos));
    navigate(siguiente);
  };

  return (
    <Box maw={320} mx="auto" pos={"relative"}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <form onSubmit={form.onSubmit(onSubmitSuccess, onSubmitError)}>
        <TextInput
          label="Correo"
          placeholder="bidenBlast@gmail.com"
          withAsterisk
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Contraseña"
          placeholder="Contrasena"
          withAsterisk
          {...form.getInputProps("contrasena")}
        />
        <PasswordInput
          label="Confirmar contraseña"
          placeholder="Contraseña"
          // disabled={!form.isValid("contrasena")}
          withAsterisk
          {...form.getInputProps("confirmarContrasena")}
        />
        <Group position="center">
          {disabled ? <DisabledButton mt={5} /> : <EnabledButton />}
        </Group>
      </form>
    </Box>
  );
}

function EnabledButton({...props}) {
  return <Button {...props} type="sumbit">Siguiente</Button>;
}

function DisabledButton({...props}) {
  return (
    <Tooltip label="Llena todos los campos correctamente">
      <Button
        data-disabled
        sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
        onClick={(event) => event.preventDefault()}
        {...props}
      >
        Siguiente
      </Button>
    </Tooltip>
  );
}
