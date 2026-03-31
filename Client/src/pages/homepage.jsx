import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { LogOut, LogIn } from "lucide-react";
import { AuthContext } from "../auth/authContext.jsx";
import { NavBar } from "./navBar.jsx";

export const Homepage = ({ onAdd }) => {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
  const getAlsoIndex = useMemo(() => {
    if (products.length <= 6) return 0;
    const randomIndex = Math.floor(Math.random() * (products.length - 6 + 1));

    return Math.max(0, randomIndex);
  }, [products.length]);

  const todayIndex = useMemo(() => {
    const today = new Date();
    const seed =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();
    const random = (seed * 9301 + 49297) % 233280;
    return Math.floor((random / 233280) * (products.length - 4));
  }, [products.length]);

  {
    /*fetching api shop data provided by server*/
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

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);

      const diff = midnight - now;
      if (diff > 0) {
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        setTimeLeft(
          `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
        );
      }
    }, 1000);

    return () => clearInterval(timer); // Crucial Cleanup!
  }, []);

  return (
    <>
      <div className="bg-neutral-900 min-h-screen py-10">
        <div className="flex flex-row container mx-auto py-10 px-5 max-w-8xl gap-15 items-start">
          {/*Offer of a day*/}
          {products.length > 0 && (
            <div className="relative flex flex-col bg-neutral-600 p-5 w-150 justify-center rounded-xl border-2 border-pink-700">
              <div className="absolute p-1 bg-pink-500 rounded-xl font-semibold -top-4 -right-3">
                -50%
              </div>
              <h2 className="text-white text-2xl mb-4 font-semibold">
                Offer of the Day
              </h2>
              <img
                src={products[todayIndex].image_url}
                className="rounded-xl object-cover"
              />
              <p className="text-gray-100 font-bold mt-2">
                {products[todayIndex].name}
              </p>
              <p className="text-2xl text-pink-500">{`$ ${products[todayIndex].price / 2}`}</p>
              <p className="text-gray-100">
                Offer ends in:{" "}
                <span className="text-2xl text-red-500">{timeLeft}</span>
              </p>

              <button
                onClick={() => onAdd(products[todayIndex])}
                className="cursor-pointer w-full bg-gray-100 hover:bg-gray-300 transition-all duration-300 text-neutral-900 px-2 py-2 font-semibold rounded-xl mt-2"
              >
                Add To Cart
              </button>
            </div>
          )}
          {/*Recomended*/}
          {products.length > 0 && (
            <div className="mt-5 flex flex-col">
              <h2 className="text-gray-100 text-2xl font-bold">
                Recomendations:
              </h2>
              <div className="grid grid-cols-3 gap-1 ">
                {products.slice(getAlsoIndex, getAlsoIndex + 6).map((p) => (
                  <div className="bg-neutral-600 p-2 rounded-xl">
                    <p className="font-semibold text-gray-100 text-md text-center truncate text-lg truncate">
                      {p.name}
                    </p>
                    {/*image div so that different sizes dont affect layout*/}
                    <div className="overflow-hidden bg-gray-200 mb-2 rounded-xl">
                      <img
                        src={p.image_url}
                        alt={`${p.name} image`}
                        className="l"
                      ></img>
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
          )}
        </div>
      </div>
    </>
  );
};
