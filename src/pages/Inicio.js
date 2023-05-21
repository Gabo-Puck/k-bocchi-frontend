import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle, auth } from "../firebase";
import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { BsExclamationLg } from "react-icons/bs";
import {RiSignalWifiErrorLine} from "react-icons/ri"
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { USUARIO_AUTORIZADO } from "../Actions/actionsUsuario";
import axios from "axios";
import { BACKEND_SERVER } from "../server";
import {
  Notification,
  Box,
  Button,
  Center,
  Divider,
  Grid,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { executeValidation } from "../utils/isFormInvalid";
import {
  email_validation,
  isRequired,
  isRequiredValidation,
  password_validation,
} from "../utils/inputValidation";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { DisabledButton, EnabledButton } from "../Components/DynamicButtons";
import { useTheme } from "@emotion/react";
import { notifications } from "@mantine/notifications";

export default function Inicio() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width:${theme.breakpoints.sm})`);
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [isAtencionOpen, { open: openAtencion, close: closeAtencion }] =
    useDisclosure(false);
  const [isErrorOpen, { open: openError, close: closeError }] =
    useDisclosure(false);

  const form = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email: "",
      contrasena: "",
    },
    validate: {
      contrasena: (value) =>
        executeValidation(value, [isRequiredValidation, password_validation]),
      email: (value) =>
        executeValidation(value, [isRequiredValidation, email_validation]),
    },
  });
  const getRol = async ({ uid }) =>
    await axios.get(`${BACKEND_SERVER}/usuarios/datos/${uid}`);
  useEffect(() => {
    async function checkLogin() {
      try {
        const result = await getRedirectResult(auth);
        console.log(result);
        if (result) {
          // This is the signed-in user
          const firebaseUser = result.user;

          try {
            const response = (await getRol(firebaseUser)).data;
            const user = { ...response, ...firebaseUser };
            navigate("/app");
            dispatch({ type: USUARIO_AUTORIZADO, payload: user });
          } catch (err) {
            console.log(err);

            navigate("/registro");
            dispatch({
              type: USUARIO_AUTORIZADO,
              payload: { isGmail: true, ...firebaseUser },
            });
          }

          // This gives you a Facebook Access Token.
          // const credential = GoogleAuthProvider.credentialFromResult(auth, result);
          // const token = credential.accessToken;
        }
      } catch (err) {
        if (err) console.log(err);
      }
    }
    checkLogin();
  }, []);
  useEffect(() => setIsDisabled(!form.isValid()), [form.values]);
  const loginUsuario = async () => {
    if (form.validate().hasErrors) return;
    let { email, contrasena } = form.values;
    try {
      let response = await axios.post(`${BACKEND_SERVER}/usuarios/datos/log`, {
        email: email,
        contrasena: contrasena,
      });
      console.log(response.data);
      dispatch({
        type: USUARIO_AUTORIZADO,
        payload: { ...response.data },
      });
      navigate("/app");
    } catch (errorResponse) {
      if (errorResponse && !errorResponse.response) {
        openError();
        console.log(
          "Se nos murio la api o esta mal puesto la direccion del server: ",
          errorResponse
        );
        notifications.show({
          message: "Estamos experimentando problemas, disculpa 😭. Intenta más tarde",
          autoClose:3500,
          icon:<RiSignalWifiErrorLine/>,
          color:"red.5"
        })
        return;
      }
      if (
        errorResponse &&
        errorResponse.response.data &&
        errorResponse.response.status == 451
      ) {
        console.log("usuario registrado con google");
      }
      if (
        errorResponse.response &&
        errorResponse.response.data &&
        errorResponse.response.status == 452
      ) {
        console.log("contraseña incorrecta");
      }
      notifications.show({
        message: errorResponse.response.data,
        autoClose:3500,
        icon:<BsExclamationLg/>,
        color:"orange.5"
      })
      
    }
  };
  return (
    <>
      <Center mx="center" pos="relative" mih="90vh">
        <Stack w="90vw">
          <Title align="center" order={2}>
            Ingresa a K-Bocchi
          </Title>
          <Grid justify="center" align="center" gutter="xs">
            <Grid.Col sm="auto" px="lg">
              <form>
                <Stack p="md" justify="flex-end">
                  <TextInput
                    placeholder="Escribe tu correo"
                    label="Correo"
                    {...form.getInputProps("email")}
                  />
                  <PasswordInput
                    placeholder="Escribe tu contraseña"
                    label="Contraseña"
                    
                    {...form.getInputProps("contrasena")}
                  />
                  {isDisabled ? (
                    <DisabledButton
                      type="submit"
                      w="100%"
                      radius="0"
                      color="green-nature"
                    >
                      Ingresar
                    </DisabledButton>
                  ) : (
                    <EnabledButton
                      type="submit"
                      w="100%"
                      radius="0"
                      color="green-nature"
                      onClick={(e) => {
                        e.preventDefault();
                        loginUsuario();
                      }}
                    >
                      Ingresar
                    </EnabledButton>
                  )}
                </Stack>
                <Divider
                  size="sm"
                  labelPosition="center"
                  label="ó"
                  orientation={isMobile ? "horizontal" : "vertical"}
                />
              </form>
            </Grid.Col>
            
              {!isMobile && (
                <Grid.Col sm={1} span="content">
                  <div
                    style={{
                      borderRight: `1px solid ${theme.colors.dark[0]} `,
                      height: "40vh",
                    }}
                  ></div>
                </Grid.Col>
              )}
            
            <Grid.Col sm="auto" span="content">
              <Center>
                <Button
                  radius="0"
                  px="4em"
                  color="dark"
                  variant="outline"
                  leftIcon={<FcGoogle size="1.5em" />}
                  h="4em"
                  onClick={() => {
                    signInWithGoogle();
                  }}
                >
                  Continuar con google
                </Button>
              </Center>
              <Box
                pos={isMobile ? "relative" : "absolute"}
                left={isMobile ? "0" : "80%"}
                bottom="90%"
              >
                <Link style={{ textDecoration: "none" }} to={"/registro"}>
                  <Center>
                    <Text align="center" color="dimmed" fw="bold">
                      Crea una cuenta
                    </Text>
                  </Center>
                </Link>
              </Box>
            </Grid.Col>
          </Grid>
        </Stack>
      </Center>

      {/* <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Notification
          withBorder
          maw="50vw"
          icon={<BsExclamationLg />}
          title="Aviso"
          color="orange.4"
          display={isAtencionOpen ? "" : "none"}
        >
          {message}
        </Notification>
      </MediaQuery>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Notification
          withBorder
          maw="100vw"
          icon={<BsExclamationLg />}
          title="Aviso"
          color="orange.4"
          display={isAtencionOpen ? "" : "none"}
          onCl
        >
          {message}
        </Notification>
      </MediaQuery> */}

      <br />
    </>
  );
}
