import { Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useEffect, useState } from "react";
import Videostream from "../Components/Videochat/Videostream";
import Webcam from "../Components/Videochat/Webcam";
// import Webcam from "react-webcam";


export default function Videochat() {
  
  return (
    <>
      <Title>Videochat</Title>
      {/* Tu */}
      {/* <Webcam/> */}
      <Webcam/>
    </>
  );
}
