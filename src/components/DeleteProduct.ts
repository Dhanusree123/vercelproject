import axios from "axios";

export const handleDeleteProduct = async (id: number) => {
  axios
    .delete(`https://fakestoreapi.com/products/${id}`)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .then((response) => console.log("Product deleted successfully"));
};
