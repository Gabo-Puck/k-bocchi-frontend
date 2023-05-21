import { useEffect, useState } from "react";

import { useNavigate, useOutletContext } from "react-router-dom";
import {
  email_validation,
  isEmailAvailable,
  isRequiredValidation,
  password_validation,
} from "../../utils/inputValidation";
import { useForm } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  Box,
  LoadingOverlay,
  PasswordInput,
  TextInput,
  ThemeIcon,
  Title,
  Text,
  Flex,
} from "@mantine/core";
import { executeValidation } from "../../utils/isFormInvalid";
import { hasInitialValues } from "../../utils/hasInitialValues";
import ErrorModal from "../../Components/ErrorModal";
import MensajeErrorConexion from "../../Components/MensajeErrorConexion";
import { DisabledButton, EnabledButton } from "../../Components/DynamicButtons";
import { FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";
const selectUsuarioIsGmail = (state) => state.usuario.isGmail;

export default function DatosIdentificacion({ siguiente, atras }) {
  const isGmail = useSelector(selectUsuarioIsGmail);
  const { datos, setDatos } = useOutletContext();
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { email, contrasena } = datos;
  const [disabled, setDisabled] = useState(true&&!isGmail);
  const [isLoading, setIsLoading] = useState(false);
  // const isMobile = useMediaQuery("(max-width: 50em)");
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
        isGmail
          ? null:executeValidation(value, [
              isRequiredValidation,
              password_validation,
            ])
          ,
      email: (value) =>
        executeValidation(value, [isRequiredValidation, email_validation]),
      confirmarContrasena: (value, values) =>
        isGmail
          ? null
          : executeValidation(value, [
              isRequiredValidation,
              password_validation,
              (value) =>
                values.contrasena !== value
                  ? "Las contraseñas no coinciden"
                  : null,
            ]),
    },
  });
  useEffect(() => {
    setDatos({ ...datos, ...form.values });
    if (form.values.confirmarContrasena != form.values.contrasena)
      form.setErrors({
        ...form.errors,
        confirmarcontrasena: "Las contraseñas no coinciden",
      });
    setDisabled(!form.isValid());
  }, [form.values]);
  useEffect(() => hasInitialValues(form), []);

  const onSubmitSuccess = async (data) => {
    console.log("DATOS: ", datos);
    setIsLoading(true);
    let resultado = await isEmailAvailable({ ...data });
    setIsLoading(false);
    if (resultado && resultado.response && resultado.response.data) {
      form.setErrors({ email: resultado.response.data });
      return;
    }
    if (resultado && !resultado.response) {
      open();
      console.log(
        "Se nos murio la api o esta mal puesto la direccion del server: ",
        resultado
      );
      return;
    }
    navigate(siguiente);
  };

  const onSubmitError = (data) => {
    alert(JSON.stringify(datos));
    navigate(siguiente);
  };

  return (
    <>
      <ErrorModal close={close} opened={opened}>
        <MensajeErrorConexion />
      </ErrorModal>

      <Box mx="auto" pos={"relative"}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <ThemeIcon radius="xl" size="xl" color="green-nature">
          <FaLock color="green-nature" />
        </ThemeIcon>
        <Title order={3}>¡Bienvenido!</Title>
        <Text order={5} mt="lg" size="lg" color="dimmed">
          Empecemos con tus datos datos para ingresar a Bocchi
        </Text>
        <form onSubmit={form.onSubmit(onSubmitSuccess, onSubmitError)}>
          <TextInput
            label="Correo"
            placeholder="bidenBlast@gmail.com"
            mt="lg"
            withAsterisk
            disabled={isGmail}
            {...form.getInputProps("email")}
          />
          {!isGmail && (
            <>
              <PasswordInput
                label="Contraseña"
                placeholder="Contrasena"
                mt="xl"
                withAsterisk
                {...form.getInputProps("contrasena")}
              />
              <PasswordInput
                label="Confirmar contraseña"
                placeholder="Contraseña"
                mt="xl"
                // disabled={!form.isValid("contrasena")}
                withAsterisk
                {...form.getInputProps("confirmarContrasena")}
              />
            </>
          )}

          <Flex justify="flex-end" mt="lg">
            {disabled ? (
              <DisabledButton color="green-nature">Siguiente</DisabledButton>
            ) : (
              <EnabledButton color="green-nature">Siguiente</EnabledButton>
            )}
          </Flex>
        </form>
      </Box>
    </>
  );
}
