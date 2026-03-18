import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/homepage'
import { ShoppingCards } from './pages/shoppingCards'
import { CheckoutPage } from './pages/checkoutPage'
import { AboutPage } from './pages/about'

{/*Functions/variables that we carry over between subsites*/}
export const AppRoutes = ({onAddToCart, onClearCart, cart, handleOnQuantityChange, onOrder}) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/shop" element={<ShoppingCards onAdd={onAddToCart}/>} />
                <Route path="/checkout" element={<CheckoutPage onClear={onClearCart} items={cart} onQuantityChange={handleOnQuantityChange} order={onOrder}/>} />
                <Route path="about" element={<AboutPage />}/>
            </Routes>
        </Router>

    )
}