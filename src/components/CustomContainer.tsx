import { Container } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const CustomContainer = ({ children }: Props) => {
  return (
    <Container maxWidth="lg" sx={{ p: 5, mt: 4 }}>
      {children}
    </Container>
  );
};

export default CustomContainer;
