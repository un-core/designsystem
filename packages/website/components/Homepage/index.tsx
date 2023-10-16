import React from "react";
import Hero from "./Hero";
import Possiblities from "./Possibilities";
import Tools from "./Tools";
import { Wrapper } from "@wfp/react";

export default function Homepage() {
  return (
    <Wrapper pageWidth="md">
      <Hero />
      <Possiblities />
      <Tools />
    </Wrapper>
  );
}
