"use client";

import { IProduct } from "@/types/product";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState<{
    [key: string]: { id: string; items: IProduct[] }[];
  }>({});
  const [orderCounts, setOrderCounts] = useState<{
    [key: string]: { [key: string]: number };
  }>({});

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "{}");
    const storedOrderCounts = JSON.parse(
      localStorage.getItem("orderCounts") || "{}"
    );

    setOrders(storedOrders);
    setOrderCounts(storedOrderCounts);
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Orders
      </Typography>

      {Object.keys(orders).length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          No orders placed yet.
        </Typography>
      ) : (
        Object.keys(orders).map((userEmail) => (
          <Box key={userEmail} sx={{ mb: 5, p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Orders for : <strong>{userEmail}</strong>
            </Typography>

            {Array.isArray(orders[userEmail]) ? (
              orders[userEmail].map((order) => (
                <Box
                  key={order.id}
                  sx={{
                    mb: 4,
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Order ID: {order.id}
                  </Typography>

                  <Grid container spacing={3}>
                    {Array.isArray(order.items) ? (
                      order.items.map((product) => (
                        <Grid
                          sx={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                          key={product.id}
                        >
                          <Card
                            sx={{
                              width: "80vw",
                              height: "100%",
                              display: "flex",
                            }}
                          >
                            <Box
                              component="img"
                              src={product.image}
                              alt={product.title}
                              sx={{
                                height: 120,
                                width: 120,
                                objectFit: "contain",
                              }}
                            />
                            <CardContent>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                              >
                                {product.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Price: Rs. {product.price}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Quantity:
                                {orderCounts[userEmail]?.[product.id] || 1}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))
                    ) : (
                      <Typography>No</Typography>
                    )}
                  </Grid>
                </Box>
              ))
            ) : (
              <Typography>Not found</Typography>
            )}
          </Box>
        ))
      )}
    </Box>
  );
};

export default OrdersPage;
