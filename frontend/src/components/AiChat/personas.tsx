import { PersonaOptions } from "@nlux/react";

const assistantCssStyle = {
  background: "linear-gradient(#4a8582, #00ffbf)",
  //   fontSize: "1.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
};

export const personas: PersonaOptions = {
  assistant: {
    name: "Zubin Assistant",
    avatar: (
      <img style={assistantCssStyle} src="../../../public/zubin.svg" alt="" />
    ),
    tagline: "Your Personal Assistant",
  },
  user: {
    name: "Alex",
    avatar: "../../../public/zubin.png",
  },
};
