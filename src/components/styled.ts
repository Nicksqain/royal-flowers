import { chakra } from "@chakra-ui/react";

export const Section = chakra("section");
export const ContentWrapper = chakra("div", {
  base: {
    pt: 6,
    pl: 6,
    pb: 8,
    display: "flex",
    alignItems: "start",
    justifyContent: "normal",
    flexDirection: "column",
    overflowX: "auto",
    width: "100%",
  },
});