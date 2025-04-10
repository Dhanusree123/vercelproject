import axios from "axios";


export const findUsers = async () => {
  try {
    const response = await axios.get(
      "https://fakestoreapi.com/users",

      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.data;
    return data;
  } catch (err) {
    console.log(err);
  }

};
