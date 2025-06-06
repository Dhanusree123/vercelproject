/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Add, Home, ShoppingCart } from "@mui/icons-material";
import { Badge, Box, Button, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const updateCartCount = useCallback(() => {
    const cartCounts = JSON.parse(localStorage.getItem("cartCounts") || "{}");
    const activeUser = localStorage.getItem("loggedInUser") || "";

    if (activeUser && cartCounts[activeUser]) {
      const totalCount = Object.values(cartCounts[activeUser]).reduce(
        (acc: number, count: any) => acc + count,
        0
      );
      setTotal(totalCount);
    } else {
      setTotal(0);
    }
  }, []);

  useEffect(() => {
    const updateUserAndCart = () => {
      const user = localStorage.getItem("loggedInUser");
      setLoggedInUser(user);
      updateCartCount();
    };
    updateUserAndCart();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("userLoggedIn", updateUserAndCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("userLoggedIn", updateUserAndCart);
    };
  });

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.alert("Logged Out Successfully");
    router.push("/login");
    setLoggedInUser(null);
    setTotal(0);
  };

  const handleClickOrders = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser === "ganesh@microfox.co") {
      router.push("/orders");
    } else {
      router.push("/my-orders");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box>
        <Link href={"/"}>
          <IconButton size="small">
            <Home />
          </IconButton>
        </Link>

        {loggedInUser === "ganesh@microfox.co" && (
          <Link href={"/product-add"}>
            <IconButton size="small">
              <Add />
            </IconButton>
          </Link>
        )}
      </Box>
      <Box>
        {loggedInUser && (
          <Box>
            <IconButton href="/cart">
              <Badge badgeContent={total} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {loggedInUser === "ganesh@microfox.co" ? (
              <Link href={"/orders"}>
                <Button onClick={handleClickOrders}>Orders</Button>
              </Link>
            ) : (
              <Link href={"/my-orders"}>
                <Button onClick={handleClickOrders}>Orders</Button>
              </Link>
            )}

            <Link href="/login">
              <Button onClick={handleLogout} sx={{ ml: 2 }}>
                LOGOUT
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
