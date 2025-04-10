"use client";
import { AppBar, Badge, IconButton, Stack, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";
import { Home, ShoppingBag } from "@mui/icons-material";

const Header = () => {
  const { logout, token, userId, cartQuantity } = useGlobalContext();

  console.log(token, userId);
  return (
    <AppBar position="static">
      <Stack
        sx={{ p: 2 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          sx={{ color: "white" }}
          variant="h5"
          component={Link}
          href="/"
        >
          <Home />
        </Typography>
        {token && userId && (
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ color: "#fff" }}
          >
            <IconButton component={Link} href="/cart">
              <Badge badgeContent={cartQuantity} color="error">
                <ShoppingBag sx={{ color: "#fff" }} />
              </Badge>
            </IconButton>
            <IconButton onClick={logout}>
              <LogoutIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </AppBar>
  );
};

export default Header;
