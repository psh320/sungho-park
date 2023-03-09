import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../../public/laptop-animation.json";

export default function Animation() {
  return <Lottie loop animationData={lottieJson} play style={{ zIndex: 0 }} />;
}
