import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/homepage'
import { ShoppingCards } from './pages/shoppingCards'
import { CheckoutPage } from './pages/checkoutPage'

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/shop" element={<ShoppingCards />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
        </Router>

    )
}