import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUsuario } from "../../utils/usuarioHooks";
export default function OnboardPaypal() {
  const { terapeuta } = useSelector(selectUsuario);
  const [links, setLinks] = useState();
  const [showButton, setShowButton] = useState(false);
  const handleScriptLoad = () => {
    // Aquí puedes realizar cualquier acción necesaria después de que el script se haya cargado
    console.log("Script de PayPal cargado correctamente");
  };
  const getOnboardLinks = async () => {
    if (!terapeuta) return;
    let { id: id_terapeuta } = terapeuta;
    try {
      let { data } = await axios.get(
        `/pagos/create-onboard-seller/${id_terapeuta}`
      );
      console.log(data.links);
      setLinks(data.links);
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  useEffect(() => {
    console.log(links);
    if (links) {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://www.paypal.com/webapps/merchantboarding/js/lib/lightbox/partner.js";

      const handleScriptLoad = () => {
        // Aquí puedes realizar cualquier acción necesaria después de que el script se haya cargado
        console.log("Script de PayPal cargado correctamente");
        setShowButton(true);
      };

      script.onload = handleScriptLoad;
      document.getElementsByTagName("head")[0].appendChild(script);

      return () => {
        document.getElementsByTagName("head")[0].removeChild(script);
      };
    }
  }, [links]);
  useEffect(() => {
    getOnboardLinks();
  }, []);
  if (!terapeuta) return;
  return !links ? (
    <></>
  ) : showButton ? (
    <div dir="ltr" style={{ textAlign: "left" }}>
      <a data-paypal-button="true" href={`${links[1].href}`} target="_self">
        Sign up for PayPal
      </a>
    </div>
  ) : (
    <></>
  );
}
