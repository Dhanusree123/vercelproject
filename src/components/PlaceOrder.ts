
// import { IProduct } from "@/types/product";

// export const placeOrder = () => {
//     const activeUser = localStorage.getItem("loggedInUser");
//     if (!activeUser) {
//       alert("Login to place an order");
//       return;
//     }
  
//     const carts = JSON.parse(localStorage.getItem("carts") || "{}");
//     const cartCounts = JSON.parse(localStorage.getItem("cartCounts") || "{}");
//     const orders = JSON.parse(localStorage.getItem("orders") || "{}");
  
//     const userCart = carts[activeUser] || [];
//     const userCounts = cartCounts[activeUser] || {};
    
//     let orderValid = true;
//     let errorMessage = "";
  
//     userCart.forEach((product:IProduct) => {
//       const requestedQuantity = userCounts[product.id] || 0;
//       if (requestedQuantity > product.stock) {
//         orderValid = false;
//         errorMessage += `Not enough stock for ${product.title}. Available: ${product.stock}, Requested: ${requestedQuantity}\n`;
//       }
//     });
  
//     if (!orderValid) {
//       alert(`Order cannot be placed due to stock issues:\n${errorMessage}`);
//       return;
//     }
  
//     orders[activeUser] = orders[activeUser] || [];
//     orders[activeUser].push(...userCart);
  
//     localStorage.setItem("orders", JSON.stringify(orders));
    
//     delete carts[activeUser];
//     delete cartCounts[activeUser];
    
//     localStorage.setItem("carts", JSON.stringify(carts));
//     localStorage.setItem("cartCounts", JSON.stringify(cartCounts));
  
//     alert("Order placed successfully!");
//   };
  

import { IProduct } from "@/types/product";

export const placeOrder = () => {
    const activeUser = localStorage.getItem("loggedInUser");
    if (!activeUser) {
        alert("Login to place an order");
        return;
    }

    const carts = JSON.parse(localStorage.getItem("carts") || "{}");
    const cartCounts = JSON.parse(localStorage.getItem("cartCounts") || "{}");
    const orders = JSON.parse(localStorage.getItem("orders") || "{}");
    const orderCounts = JSON.parse(localStorage.getItem("orderCounts") || "{}");
    const products = JSON.parse(localStorage.getItem("products") || "[]");

    const userCart = carts[activeUser] || [];
    const userCounts = cartCounts[activeUser] || {};
    
    let orderValid = true;
    let errorMessage = "";

    userCart.forEach((product: IProduct) => {
        const requestedQuantity = userCounts[product.id] || 0;
        if (requestedQuantity > product.stock) {
            orderValid = false;
            errorMessage += `Not enough stock for ${product.title}. Available: ${product.stock}, Requested: ${requestedQuantity}\n`;
        }
    });

    if (!orderValid) {
        alert(`Order cannot be placed due to stock issues:\n${errorMessage}`);
        return;
    }

    orders[activeUser] = orders[activeUser] || [];
    orderCounts[activeUser] = orderCounts[activeUser] || {};

    userCart.forEach((product: IProduct) => {
        const requestedQuantity = userCounts[product.id];
        orders[activeUser].push(product);
        orderCounts[activeUser][product.id] = requestedQuantity;
        
        const productIndex = products.findIndex((p: IProduct) => p.id === product.id);
        if (productIndex !== -1) {
            products[productIndex].stock -= requestedQuantity;
        }
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("orderCounts", JSON.stringify(orderCounts));
    localStorage.setItem("products", JSON.stringify(products));

    Object.keys(carts).forEach((user) => {
        carts[user] = carts[user].map((p: IProduct) => {
            const productIndex = products.findIndex((prod: IProduct) => prod.id === p.id);
            if (productIndex !== -1) {
                return { ...p, stock: products[productIndex].stock };
            }
            return p;
        });
    });

    localStorage.setItem("carts", JSON.stringify(carts));
    
    delete carts[activeUser];
    delete cartCounts[activeUser];
    
    localStorage.setItem("carts", JSON.stringify(carts));
    localStorage.setItem("cartCounts", JSON.stringify(cartCounts));

    alert("Order placed successfully!");
};