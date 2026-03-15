import { useState , useEffect} from 'react'
import { Link } from 'react-router-dom';

export const Homepage = () => {

        const [products, setProducts] = useState([]);

        {/*fetching api shop data provided by server*/}
        const fetchProducts = async () => {
        try {
          const response = await fetch('/api/products');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          else {
            const data = await response.json();
            setProducts(data);
            console.log('Products fetched successfully:', data);
          }
    
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    

      useEffect(() => {
        fetchProducts();
        console.log(products)
    
      },[products]);


    return (
        <>
            <div className='bg-gray-80 min-h-screen py-10'>
                <h1 className='text-4xl font-bold text-center text-gray-900 border-b-2 pb-4'>Main Page</h1>
                <div>
                  <div>
                    <Link 
                      to={"/about"} 
                      className="bg-indigo-600 text-white p-2 rounded">
                      {"About page"}
                    </Link>                  
                  </div>
                  <div>
                    <Link 
                      to={"/shop"} 
                      className="bg-indigo-600 text-white p-2 rounded">
                      {"Shop"}
                    </Link>
                  </div>
                  <div>
                    <Link 
                      to={"/checkout"} 
                      className="bg-indigo-600 text-white p-2 rounded">
                      {"cart"}
                    </Link>
                  </div>
                </div>
            </div>
        </>
    )
}
