import { IProduct } from "@/types/product";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import React from "react";

type Props = {
  product?: IProduct;
  handleSubmitProduct: (product: IProduct) => void;
};

type IFormFields = {
  [key: string]: {
    label: string;
    type: string;
    defaultValue: string | number;
  };
};

const FORM_FIELDS: IFormFields = {
  id: {
    label: "Id",
    type: "number",
    defaultValue: 0,
  },
  title: {
    label: "Title",
    type: "text",
    defaultValue: "",
  },
  price: {
    label: "Price",
    type: "number",
    defaultValue: 0,
  },
  description: {
    label: "Description",
    type: "text",
    defaultValue: "",
  },
  category: {
    label: "category",
    type: "text",
    defaultValue: "",
  },
  image: {
    label: "Image",
    type: "text",
    defaultValue: "",
  },
  rate: {
    label: "Rate",
    type: "number",
    defaultValue: 0,
  },
  count: {
    label: "Count",
    type: "number",
    defaultValue: 0,
  },
};

const ProductForm = (props: Props) => {
  const { product, handleSubmitProduct } = props;

  const [productValues, setProductValues] = React.useState<IProduct>({
    id: product?.id ?? 0,
    title: product?.title ?? "",
    price: product?.price ?? 0,
    description: product?.description ?? "",
    category: product?.category ?? "",
    image: product?.image ?? "",
    rating: {
      rate: product?.rating?.rate ?? 0,
      count: product?.rating?.count ?? 0,
    },
  });

  const { image } = productValues;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmitProduct(productValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "rate" || name === "count") {
      setProductValues((prev) => ({
        ...prev,
        rating: {
          ...prev.rating,
          [name]: value,
        },
      }));
    } else {
      setProductValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <Card sx={{ maxWidth: 500, p: 2, margin: "0 auto" }}>
      <Typography variant="h5">{product ? "Edit" : "Add"} Product</Typography>
      <br />
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {image && (
            <Box
              component="img"
              sx={{ height: 200, width: "auto", objectFit: "contain" }}
              src={productValues?.image}
            />
          )}
          {Object.keys(FORM_FIELDS).map((key) => {
            const { label, type, defaultValue } = FORM_FIELDS[key];
            return (
              <TextField
                key={label}
                label={label}
                type={type}
                value={
                  key === "rate"
                    ? productValues.rating.rate
                    : key === "count"
                    ? productValues.rating.count
                    : productValues?.[key as keyof IProduct] ?? defaultValue
                }
                name={key}
                onChange={handleChange}
                required
              />
            );
          })}
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default ProductForm;
