"use client";
import { findUsers } from "@/components/FindUsers";
import { useGlobalContext } from "@/context/GlobalContext";
import { ILogin } from "@/types/login";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const [loginValues, setLoginvalues] = useState<ILogin>({
    username: "",
    password: "",
  });
  const { login } = useGlobalContext();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/auth/login",
        loginValues,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.data;
      console.log("Login success:", data, "Details", loginValues);
      if (data?.token) {
        const users = await findUsers();
        const loggedUser = users.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (u: any) => u.username === loginValues.username
        );
        login(data.token, loggedUser.id);
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      redirect("/");
    }
  }, []);

  return (
    <Card sx={{ width: 400, margin: "32px auto" }}>
      <Stack
        spacing={2}
        sx={{ p: 2 }}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Typography variant="h5">Login</Typography>
        <Stack
          component="form"
          onSubmit={handleSubmit}
          spacing={2}
          sx={{ width: "100%" }}
        >
          <TextField
            value={loginValues.username}
            onChange={(e) =>
              setLoginvalues({ ...loginValues, username: e.target.value })
            }
            type="text"
            placeholder="Username..."
            fullWidth
          />
          <TextField
            value={loginValues.password}
            onChange={(e) =>
              setLoginvalues({ ...loginValues, password: e.target.value })
            }
            type="password"
            placeholder="Password..."
            fullWidth
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default LoginPage;
