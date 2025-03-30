"use client";
import { Add, Home } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.alert("Logged Out Successfully");
    setLoggedInUser(null);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box>
        <Button href="/" size="small">
          <Home />
        </Button>
        <Button href="/product-add" size="small">
          <Add />
        </Button>
      </Box>
      <Box>
        <Link href={"/cart"}>
          <Button>CART</Button>
        </Link>
        <Link href={"/orders"}>
          <Button>Orders</Button>
        </Link>
        {loggedInUser ? (
          <Button color="error" onClick={handleLogout} sx={{ ml: 2 }}>
            LOGOUT
          </Button>
        ) : (
          <Button href={"/login"}>Login</Button>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
