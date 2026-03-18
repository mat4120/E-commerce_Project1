import { useState , useEffect} from 'react'
import { Link } from 'react-router-dom';

export const ShoppingCards = ({onAdd}) => {

        const [products, setProducts] = useState([]);

        {/*Fetch data for shopping cards*/}
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
      },[]);


    return (
        <>
            <div className='bg-gray-80 min-h-screen py-15'>
                <div className='container mx-auto px-15 relative'>
                  <h1 className='text-5xl font-extrabold text-gray-1000 text-center mb-1 border-b-2 border-indigo-600'>Our Products</h1>
                  {/*Nav div*/}
                  <div className='flex justify-between'>
                    <div>
                      <Link 
                        to={"/"} 
                        className="bg-indigo-600 text-white p-2 rounded-b">
                        {"Main Page"}
                      </Link>                  
                    </div>
                    <div>
                      <Link 
                        to={"/checkout"} 
                        className="bg-indigo-600 text-white p-2 rounded-b">
                        {"Cart"}
                      </Link>
                    </div>
                </div>
                  {/*Shopping cards div*/}
                  <div className='grid grid-cols-4 gap-4'>                  
                    {products.map((p) => (
                      <div key={p.id}>
                        <p className='font-semibold text-xl text-center'>{p.name}</p>
                        {/*image div so that different sizes dont affect layout*/}
                        <div className='h-64 overflow-hidden bg-gray-280 mb-2'>
                          <img src={p.image_url} alt={`${p.name} image`} className=''></img>
                        </div>
                        {/*text changing button*/}
                          <div className="group cursor-pointer">
                            <button className='w-full bg-indigo-500 hover:bg-pink-400 text-white px-2 py-2 font-semibold rounded-xl block group-hover:hidden'>{`${p.price} $`}</button>
                            <button onClick={() => onAdd(p)} className='cursor-pointer w-full bg-indigo-500 hover:bg-pink-400 text-white px-2 py-2 font-semibold rounded-xl hidden group-hover:block'>Add To Cart</button>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
            </div>
        </>
    )
}
