import { useState , useEffect} from 'react'

export const Homepage = () => {

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
                <h1 className="text-indigo-600">Welcome to the Homepage</h1>
                <h2>Here add daily offer</h2>
            </div>
        </>
    )
}
