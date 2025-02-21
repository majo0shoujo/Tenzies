import React from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function CustomConfetti() {
  const { width, height } = useWindowSize();

  return (
    <Confetti
      width={width}
      height={height}
      colors={["#dc6163", "#dc6163", "#dd94b8", "#dc6163", "#f1b07a"]} // Colores personalizados
    />
  );
}
