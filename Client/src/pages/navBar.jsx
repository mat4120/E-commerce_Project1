import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, LogIn, Home, ShoppingCart, Search } from "lucide-react";
import { AuthContext } from "../auth/authContext.jsx";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    console.log("amogus");
    logout();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="shadow-md pt-5 px-35 w-full bg-neutral-700">
      {/*top row*/}
      <div className="grid grid-cols-3 items-center w-full">
        {/*home button*/}
        <div className="flex justify-start">
          <button
            className="cursor-pointer bg-neutral-700 hover:bg-neutral-600 p-1 rounded-md ml-3 transition-all duration-200"
            onClick={() => navigate("/")}
          >
            <Home size={30} color="white" />
          </button>
        </div>
        {/*search*/}
        <div className="flex justify-center">
          <form onSubmit={handleSearch} className="flex w-full max-w-xl">
            <input
              placeholder="Search for product"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="w-full bg-neutral-500 p-3 px-5 rounded-xl outline-none text-white"
            ></input>
          </form>
          <button
            className="cursor-pointer bg-white rounded-xl p-3"
            onClick={handleSearch}
          >
            <Search size={20} color="gray" />
          </button>
        </div>
        {/*Login and cart*/}
        <div className="flex justify-end items-center gap-5">
          <div>
            {token ? (
              <button
                onClick={handleLogout}
                className="cursor-pointer flex items-center gap-3 bg-neutral-700 hover:bg-neutral-600 p-1 rounded-md text-white transition-all duration-200"
              >
                <LogOut size={25} color="white" /> Logout
              </button>
            ) : (
              <button
                onClick={() =>
                  navigate("/login", { state: { from: location.pathname } })
                }
                className="cursor-pointer flex items-center gap-3 bg-neutral-700 hover:bg-neutral-600 p-1 rounded-md text-white transition-all duration-200"
              >
                <LogIn size={25} color="white" />
                <span>LogIn</span>
              </button>
            )}
          </div>
          <div>
            <button
              className="mr-5 ml-5 p-1 rounded-xl cursor-pointer bg-neutral-700 hover:bg-neutral-600 p-2 rounded-md transition-all duration-200"
              onClick={() => navigate("/checkout")}
            >
              <ShoppingCart size={25} color="white" />
            </button>
          </div>
        </div>
      </div>
      {/*categories*/}
      <div className="flex items-center justify-between text-sm pt-3 text-md text-">
        <div className="">
          <Link
            to={"/shop?category=phone"}
            className="bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-5 rounded block text-center font-semibold mb-1 transition-all duration-200"
          >
            {"SmartPhone"}
          </Link>
        </div>
        <div className="">
          <Link
            to={"/shop?category=laptop"}
            className="bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-5 rounded block text-center font-semibold mb-1 transition-all duration-200"
          >
            {"Laptop"}
          </Link>
        </div>
        <div className="">
          <Link
            to={"/shop?category=mouse"}
            className="bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-5 rounded block text-center font-semibold mb-1 transition-all duration-200"
          >
            {"Gaming Mouse"}
          </Link>
        </div>
        <div className="">
          <Link
            to={"/shop?category=keyboard"}
            className="bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-5 rounded block text-center font-semibold mb-1 transition-all duration-200"
          >
            {"Gaming Keyboard"}
          </Link>
        </div>
        <div className="">
          <Link
            to={"/shop?category=headphones"}
            className="bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-5 rounded block text-center font-semibold mb-1 transition-all duration-200"
          >
            {"Gaming Headset"}
          </Link>
        </div>
        <div className="">
          <Link
            to={"/shop?category=gaming_console"}
            className="bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-5 rounded block text-center font-semibold mb-1 transition-all duration-200"
          >
            {"Game Console"}
          </Link>
        </div>
        <div className="">
          <Link
            to={"/shop?category=other"}
            className="bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-5 rounded block text-center font-semibold mb-1 transition-all duration-200"
          >
            {"Others"}
          </Link>
        </div>
      </div>
    </nav>
  );
};
