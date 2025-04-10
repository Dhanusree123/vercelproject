import { ICart } from "@/types/cart";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface IGlobalContext {
  token: string;
  userId: number;
  cartQuantity: number;
  setCartQuantity: (qty: number) => void;
  login: (token: string, userid: number) => void;
  logout: VoidFunction;
}

export const GlobalContext = createContext({} as IGlobalContext);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  const login = (tokendata: string, id: number) => {
    localStorage.setItem("token", tokendata);
    localStorage.setItem("userid", JSON.stringify(id));
    setToken(tokendata);
    setUserId(id);
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    setToken("");
    setUserId(0);
    setCartQuantity(0);
    router.push("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userid");

    if (storedToken) setToken(storedToken);
    if (storedUserId) setUserId(parseInt(storedUserId));
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchAndSetCartQuantity = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/carts");
        const userCarts = response.data.filter(
          (cart: ICart) => cart.userId === userId
        );

        const totalQty = userCarts.reduce((sum: number, cart: ICart) => {
          return sum + cart.products.reduce((s, p) => s + p.quantity, 0);
        }, 0);

        setCartQuantity(totalQty);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchAndSetCartQuantity();
  }, [userId]);

  return (
    <GlobalContext.Provider
      value={{
        token,
        cartQuantity,
        setCartQuantity,
        userId,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
