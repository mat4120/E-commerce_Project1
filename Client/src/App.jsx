import { useState } from 'react'
import { AppRoutes } from './routes'

function App() {
const [cart, setCart] = useState([]);

const addToCart = product => {
  setCart([...cart, product])
  console.log(cart);
};

const clearCart = () =>{
  setCart([]);
  console.log(cart);
};




  return (
    <>
      <AppRoutes onAddToCart={addToCart} onClearCart={clearCart} cart={cart}/>
    </>
  )
};

export default App;
