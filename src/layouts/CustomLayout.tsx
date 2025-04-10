"use client";
import Header from "@/components/Header";
import { GlobalProvider } from "@/context/GlobalContext";
import { Box } from "@mui/material";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const CustomLayout = ({ children }: Props) => {
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Box>Loading...</Box>;
  }

  return (
    <>
      <GlobalProvider>
        <Header />
        <main>{children}</main>
      </GlobalProvider>
    </>
  );
};

export default CustomLayout;
