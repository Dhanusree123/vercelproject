import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box>
        <Link href={"/products"}>
          <Button>PRODUCTS</Button>
        </Link>
      </Box>

      <Box>
        <Button href="/product-add" size="small">
          <Add />
        </Button>
        <Link href={"/cart"}>
          <Button>CART</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
