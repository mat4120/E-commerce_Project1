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
                <h1 className='text-4xl font-extrabold text-center text-gray-900 border-b-2 pb-4 border-indigo-600'>Main Page</h1>
                {/*Nav div*/}
                <div className=' grid grid-cols-3'>
                  <div className='flex justify-center'>
                    <Link 
                      to={"/about"} 
                      className="bg-indigo-600 text-white p-2 rounded-b w-2/3 block text-center font-semibold">
                      {"About page"}
                    </Link>                  
                  </div>
                  <div className='flex justify-center'>
                    <Link 
                      to={"/shop"} 
                      className="bg-indigo-600 text-white p-2 rounded-b w-2/3 block text-center font-semibold">
                      {"Shop"}
                    </Link>
                  </div>
                  <div className='flex justify-center'>
                    <Link 
                      to={"/checkout"} 
                      className="bg-indigo-600 text-white p-2 rounded w-2/3 block text-center justify-right font-semibold">
                      {"Cart"}
                    </Link>
                  </div>
                </div>
                {/*Daily offer div*/}
                <div>

                </div>
            </div>
        </>
    )
}
