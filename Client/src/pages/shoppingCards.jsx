import { useState , useEffect} from 'react'

export const ShoppingCards = () => {

        const [products, setProducts] = useState([]);
        const fetchProducts = async () => {
        try {
          const response = await fetch('/api/products');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          else {
            const data = await response.json();
            setProducts(data);
            console.log('Products fetched successfully:', products);
          }
    
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    
      useEffect(() => {
        fetchProducts();
    
    
      },);


    return (
        <>
            <div>
                <h1 className="text-indigo-600">Shopping Cards</h1>
                <p>Turn ul into a grid of product cards</p>
                <ul>
                    {products.map((product) => (
                        <li key={product.id || product._id}>
                            {product.name} - ${product.price}
                        </li>
        ))}
                </ul>
            </div>
        </>
    )
}
