import { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerF,
} from "@react-google-maps/api";
import "../css/mapa.css";
import {
  Box,
  Button,
  Flex,
  Grid,
  Loader,
  LoadingOverlay,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { notifications } from "@mantine/notifications";
import { showPositiveFeedbackNotification } from "../utils/notificationTemplate";
const libraries = ["places"];
export default function MapaComponent({ setDatosLat }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries: libraries,
  });
  if (!isLoaded) return <LoadingOverlay visible/>;
  return <MapaSelectPlace setDatosLat={setDatosLat} />;
}

function MapaSelectPlace({ setDatosLat }) {
  const center = useMemo(() => ({ lat: 19.43, lng: -99.13 }));

  const [selected, setSelected] = useState({
    direccion: null,
    coords: null,
  });
  return (
    <>
      <PlacesAutocomplete style={{ width: "90%" }} setSelected={setSelected} />

      <GoogleMap
        zoom={15}
        center={selected.coords || center}
        mapContainerClassName="googleMapa"
      >
        {selected.coords && <MarkerF position={selected.coords} />}
      </GoogleMap>
      <Button
        color="green-nature"
        disabled={!selected}
        onClick={() => {
          setDatosLat(selected);
          showPositiveFeedbackNotification(
            "Se ha guardado la ubicación seleccionada"
          );
          modals.closeAll();
        }}
      >
        Seleccionar
      </Button>
    </>
  );
}

function PlacesAutocomplete({ setSelected }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: "mx",
      },
      language: "es-419",
      types: ["address"],
    },
    debounce: 6000,
  });
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    if (status === "OK")
      setOptions(data.map(({ place_id, description }) => description));
    console.log(data);
  }, [status]);
  useEffect(() => {
    if (selectedValue !== "") fetchCoords();
  }, [selectedValue]);

  async function fetchCoords() {
    setValue(selectedValue, false);
    clearSuggestions();
    const results = await getGeocode({
      address: selectedValue,
    });
    const { lat, lng } = await getLatLng(results[0]);
    console.log({ lat, lng });
    setSelected({ direccion: selectedValue, coords: { lat, lng } });
  }
  return (
    <Select
      label="Ubicacion"
      placeholder="Busca una dirección..."
      searchable
      onChange={setSelectedValue}
      nothingFound="No hay resultados"
      disabled={!ready}
      searchValue={value}
      onSearchChange={(e) => {
        setValue(e);
        console.log(e);
      }}
      data={options}
    />
  );
}
export const abrirMapa = ({ setDatosLat }) => {
  modals.open({
    id: "mapa-modal",
    title: <Title order={3}>Añadir ubicación</Title>,
    fullScreen: true,
    children: (
      <SimpleGrid cols={1}>
        <MapaComponent setDatosLat={setDatosLat} />
      </SimpleGrid>
    ),
  });
};
