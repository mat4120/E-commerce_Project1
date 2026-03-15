import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/homepage'
import { ShoppingCards } from './pages/shoppingCards'
import { CheckoutPage } from './pages/checkoutPage'
import { AboutPage } from './pages/about'

export const AppRoutes = ({onAddToCart, onClearCart, cart}) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/shop" element={<ShoppingCards onAdd={onAddToCart}/>} />
                <Route path="/checkout" element={<CheckoutPage onClear={onClearCart} items={cart}/>} />
                <Route path="about" element={<AboutPage />}/>
            </Routes>
        </Router>

    )
}