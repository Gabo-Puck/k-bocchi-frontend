import { Rating } from "@mantine/core";
import { useState } from "react";

export default function EditarResena({resena,id_terapeuta, setResena}){
    const [value,setValue] = useState(resena.estrellas);
    return <><Rating value={value} onChange={setValue}/></>
}