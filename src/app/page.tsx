import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <Link href={"/products"}>
        <Button>PRODUCTS</Button>
      </Link>

      <Link href={"/product-add"}>
        <Button>PRODUCT FORM</Button>
      </Link>
    </Box>
  );
};

export default HomePage;
