import { AuthContext } from "./authContext";
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

export const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setLogin] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, pwd);
    const res = await fetch("api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: pwd }),
    });
    if (res.ok) {
      const data = await res.json();
      login(data.token);
      navigate(from);
    } else {
      setPwd("");
      return;
    }
  };

  return (
    <div className=" min-h-screen w-full flex-col flex items-center justify-center bg-neutral-900">
      <div className="flex w-80 flex-col">
        <div className="bg-neutral-600 px-5 py-10 rounded-xl shadow-sm ">
          <button
            className="cursor-pointer bg-neutral-600 hover:bg-neutral-500 p-1 rounded-md items-center mb-3"
            onClick={() => navigate("/")}
          >
            <Home size={30} color="white" />
          </button>
          <form onSubmit={handleSubmit} className="items-center">
            <h1 className="text-2xl font-bold text-gray-100">Sign In</h1>
            <div className=" flex flex-col items-start pt-5">
              <input
                type="text"
                placeholder="Username/E-mail"
                onChange={(e) => setLogin(e.target.value)}
                required
                className="mb-5 text-gray-100 border-1 border-gray-400 outline-none py-2 px-4 rounded-xl w-full"
              ></input>
              <input
                type="password"
                placeholder="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
                className="mb-3 text-gray-100 border-1 border-gray-400 outline-none py-2 px-4 rounded-xl w-full"
              ></input>
              <p
                className="text-gray-100 underline mb-3 self-end cursor-pointer"
                onClick={() => navigate("/forgot-password")}
              >
                Trouble logging in?
              </p>
              <button className="p-3 rounded-xl bg-gray-100 w-full font-semibold cursor-pointer">
                Login
              </button>
            </div>
          </form>
        </div>
        <p
          className="text-gray-100 underline cursor-pointer mt-3 self-end mr-5"
          onClick={() => navigate("/register")}
        >
          New here? Sign Up
        </p>
      </div>
    </div>
  );
};
