import { useState, useEffect, useContext } from "react";
import { AppRoutes } from "./routes";
import { AuthContext } from "./auth/authContext";

function App() {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  {
    /*Add to cart, if already is in increase quantity*/
  }
  const addToCart = (product) => {
    setCart((prevCart) => {
      const isIn = prevCart.find((i) => i.id === product.id);
      if (isIn) {
        return prevCart.map((i) =>
          i.id === product.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  {
    /*Clear cart logic*/
  }
  const clearCart = () => {
    setCart([]);
    console.log(cart);
  };

  {
    /*Cart quantity change updater*/
  }
  const setQuantity = (product, value) => {
    console.log("changed value");
    setCart((prevCart) => {
      const isIn = prevCart.find((i) => i.id === product.id);
      if (isIn) {
        return prevCart.map((i) =>
          i.id === product.id ? { ...i, quantity: value } : i,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  {
    /*On order logic*/
  }
  const handleOrder = async () => {
    console.log(`order ${JSON.stringify(cart)}`);
    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          total: cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          ),
          date: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        alert("Success");
        clearCart();
      } else {
        alert("Something went wrong");
      }
    } catch (er) {
      console.error("Error message: ", er);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      {/*Functions/variables that we carry over between subsites*/}
      <AppRoutes
        onAddToCart={addToCart}
        onClearCart={clearCart}
        cart={cart}
        handleOnQuantityChange={setQuantity}
        onOrder={handleOrder}
      />
    </>
  );
}

export default App;
