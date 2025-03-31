"use client";
import { Add, Home, ShoppingCart } from "@mui/icons-material";
import { Badge, Box, Button, IconButton } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);
    updateCartCount();
  }, []);

  const updateCartCount = () => {
    const cartCounts = JSON.parse(localStorage.getItem("cartCounts") || "{}");
    const activeUser = localStorage.getItem("loggedInUser") || "";

    if (activeUser && cartCounts[activeUser]) {
      const totalCount = Object.values(cartCounts[activeUser]).reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc: number, count: any) => acc + count,
        0
      );
      setTotal(totalCount);
    } else {
      setTotal(0);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.alert("Logged Out Successfully");
    setLoggedInUser(null);
    setTotal(0);
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
        <IconButton href="/cart">
          <Badge badgeContent={total} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>

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
