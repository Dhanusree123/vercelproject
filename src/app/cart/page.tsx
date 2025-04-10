"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import AuthGuard from "@/guards/AuthGuard";
import { ICart } from "@/types/cart";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const CartPage = () => {
  const { userId } = useGlobalContext();
  const [carts, setCarts] = useState<ICart[]>([]);

  const filteredCarts = carts.filter((cart) => cart.userId === userId);
  useEffect(() => {
    const fetchCarts = async () => {
      const response = await axios.get("https://fakestoreapi.com/carts");
      setCarts(response.data);
    };
    fetchCarts();
  }, []);

  return (
    <AuthGuard>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Carts
        </Typography>

        <Grid container spacing={3}>
          {filteredCarts.length > 0 ? (
            filteredCarts.map((cart) => (
              <Grid size={{ xs: 12, md: 6 }} key={cart.id}>
                <Card sx={{ minHeight: 300, maxWidth: 500 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Cart ID: {cart.id}
                    </Typography>
                    <Typography color="textSecondary">
                      User ID: {cart.userId}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle1" gutterBottom>
                      Products:
                    </Typography>
                    <Box component={Paper} variant="outlined" sx={{ p: 1 }}>
                      {cart.products.map((product, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 0.5,
                            px: 1,
                            borderBottom:
                              index < cart.products.length - 1
                                ? "1px solid #ddd"
                                : "none",
                          }}
                        >
                          <Typography>
                            Product ID: {product.productId}
                          </Typography>
                          <Typography>Qty: {product.quantity}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Box>
              <Typography variant="h2" textAlign="center">
                No Carts found with userId : {userId}
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </AuthGuard>
  );
};

export default CartPage;
