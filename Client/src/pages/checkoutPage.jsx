import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";

export const CheckoutPage = ({
  onClear,
  items,
  onQuantityChange,
  order,
  onAdd,
}) => {
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [products, setProducts] = useState([]);

  const getAlsoIndex = useMemo(() => {
    return Math.floor(Math.random() * 20) + 1;
  }, []);

  {
    /*Fetch data for shopping cards*/
  }
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data = await response.json();
        setProducts(data);
        console.log("Products fetched successfully:", data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="bg-neutral-900 min-h-screen py-10">
        {/*Cart div*/}
        <div className="flex-col w-1/2 mx-auto px-15 ">
          <div className="flex justify-between">
            <h1 className="text-3xl text-gray-100 font-bold">Cart:</h1>
            <button
              onClick={() => onClear()}
              className="p-2 rounded cursor-pointer bg-neutral-900 hover:bg-neutral-700 self-end transition-all duration-300"
            >
              <Trash size={24} color="white" />
            </button>
          </div>

          {/*Singular cart line div*/}
          <div className="flex flex-col justify-center gap-3 overflow-hidden flex-shrink-0">
            {/*Cart rendering conditons*/}
            {items.length === 0 ? (
              <div className="flex items-center bg-neutral-600 rounded-xl">
                <h1 className="text-2xl font-semibold text-gray-100 p-5 flex-1">
                  Your cart is empty
                </h1>
              </div>
            ) : (
              items.map((cartItem) => (
                <div className="flex items-center bg-neutral-600 rounded-xl">
                  <img
                    src={cartItem.image_url}
                    alt={`${cartItem.name} photo`}
                    className="w-24 h-24 m-2 rounded-xl object-cover"
                  ></img>
                  <h1 className="text-md text-gray-100 font-bold flex-1 ">
                    {cartItem.name}
                  </h1>
                  <select
                    value={cartItem.quantity}
                    onChange={(e) =>
                      onQuantityChange(cartItem, parseInt(e.target.value))
                    }
                    className="w-16 bg-neutral-600 border-1 border-gray-100 text-white p-2 rounded-xl outline-none cursor-pointer"
                  >
                    {options.map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <p className="w-24 text-gray-100 text-right mr-5 items-center">{`$ ${cartItem.price * cartItem.quantity}`}</p>
                  {/*implement remove logic*/}
                  <button className="mr-5 bg-red-400 px-2 rounded hover:bg-red-500 cursor-pointer transition-all duration-300">
                    &#xD7;
                  </button>
                </div>
              ))
            )}
          </div>
          {/*Get also*/}
          <div className=" mt-15 flex flex-col">
            <h2 className="text-gray-100 text-2xl font-bold">Get also:</h2>
            <div className="grid grid-cols-4 gap-1 ">
              {products.slice(getAlsoIndex, getAlsoIndex + 4).map((p) => (
                <div className="bg-neutral-600 rounded-xl p-2">
                  <p className="font-semibold text-gray-100 text-md text-center truncate">
                    {p.name}
                  </p>
                  {/*image div so that different sizes dont affect layout*/}
                  <div className="overflow-hidden rounded-xl bg-gray-200 mb-2">
                    <img src={p.image_url} alt={`${p.name} image`}></img>
                  </div>
                  {/*text changing button*/}
                  <div className="relative group cursor-pointer h-10">
                    <button className="absolute w-full bg-gray-100 px-2 py-2 font-semibold rounded-xl block group-hover:opacity-0 text-neutral-900 transition-all duration-300 ease-in-out">{`${p.price} $`}</button>
                    <button
                      onClick={() => onAdd(p)}
                      className="absolute cursor-pointer w-full bg-gray-300 text-neutral-900 px-2 py-2 font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*Total*/}
          {items.length === 0 ? (
            <div></div>
          ) : (
            <div className="flex bg-neutral-600 flex-col mt-15 p-2 rounded-xl text-gray-100">
              <p className="text-4xl font-bold mb-4">Summary:</p>
              <p className="font-bold">{`Products: $${items.reduce((acc, item) => acc + item.price * item.quantity, 0)}`}</p>
              <p className="font-bold border-b-1 border-neutral-900">
                Shipping: $4.99
              </p>
              <p className="text-4xl font-bold mt-2">{`Total: $${items.reduce((acc, item) => acc + item.price * item.quantity, 0) + 4.99}`}</p>
              <button
                className="bg-gray-100 text-neutral-900 p-2 rounded-b cursor-pointer hover:bg-indigo-700 w-24 transition-all duration-200"
                disabled={items.length === 0}
                onClick={() => order()}
              >
                Order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
