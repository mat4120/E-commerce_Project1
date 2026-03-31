import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { ShoppingCards } from "./pages/shoppingCards";
import { CheckoutPage } from "./pages/checkoutPage";
import { AboutPage } from "./pages/about";
import { PrivRoute } from "./auth/privRoute";
import { Login } from "./auth/login";
import { Register } from "./auth/register";
import { NavBar } from "./pages/navBar";
import { Footer } from "./pages/footer";

const MainLayout = ({ cart }) => (
  <>
    <NavBar cart={cart} />
    <Outlet />
    <Footer />
  </>
);

{
  /*Functions/variables that we carry over between subsites*/
}
export const AppRoutes = ({
  onAddToCart,
  onClearCart,
  cart,
  handleOnQuantityChange,
  onOrder,
}) => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout cart={cart} />}>
          <Route path="/" element={<Homepage onAdd={onAddToCart} />} />
          <Route path="/shop" element={<ShoppingCards onAdd={onAddToCart} />} />
          <Route
            path="/checkout"
            element={
              <PrivRoute>
                <CheckoutPage
                  onClear={onClearCart}
                  items={cart}
                  onQuantityChange={handleOnQuantityChange}
                  order={onOrder}
                  onAdd={onAddToCart}
                />
              </PrivRoute>
            }
          />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
