import { useState , useEffect, useMemo} from 'react'
import { useLocation } from 'react-router-dom';

export const ShoppingCards = ({onAdd}) => {
    const location = useLocation();
    const queryPar = useMemo(()=> {
      return new URLSearchParams(location.search);
    },[location.search])

    const navCategories = [
        { name: 'All', value: '' },
        { name: 'Phones', value: 'phone' },
        { name: 'Laptops', value: 'laptop' },
        { name: 'Mice', value: 'mouse' },
        { name: 'Keyboards', value: 'keyboard' },
        { name: 'Headphones', value: 'headphones' },            
        { name: 'Gaming Consoles', value: 'gaming_console' },
        { name: 'Others', value: 'other' }
];
    const sortingOptions = [
        { name: 'Price: Low to High', value: 'price_asc' },
        { name: 'Price: High to Low', value: 'price_desc' },
        { name: 'Alphabetical: A-Z', value: 'name_asc' },
        { name: 'Alphabetical: Z-A', value: 'name_desc' }
];
        const startCat = queryPar.get('category') || '';
        const [products, setProducts] = useState([]);
        const [cat, setCat] = useState(startCat);
        const [minFilter, setMinFilter] = useState(0)
        const [maxFilter, setMaxFilter] = useState(2200)
        const [searchQuerry, setSearchQuerry] = useState(queryPar.get('search') || '')
        const [sortBy, setSortBy] = useState('price_asc')

        const filteredProducts = useMemo(() =>{
            let result = [...products]

            if(cat !== ''){
                result = result.filter((p) => p.category === cat);
            }

            result = result.filter((p) => 
                p.price >= Number(minFilter) && p.price <= Number(maxFilter)
            );

            if (searchQuerry){
                result = result.filter ((p) =>
                    p.name.toLowerCase().includes(searchQuerry.toLowerCase())
            )};

            result.sort((a, b) => {
                if (sortBy === 'price_asc') return a.price - b.price;
                if (sortBy === 'price_desc') return b.price - a.price;
                if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
                if (sortBy === 'name_desc') return b.name.localeCompare(a.name);
        });
            
            return result;
        },[cat, products, minFilter, maxFilter, searchQuerry, sortBy])



        const handleMaxPriceFilterChange = (e) => {
            const val = Number(e.target.value);
            if (val > 9999) {
                setMaxFilter(9999);
            } else {
                setMaxFilter(e.target.value);
            }
        }

        const handleMinPriceFilterChange = (e) => {
            const val = Number(e.target.value);
            if (val > maxFilter) {
                setMinFilter(maxFilter - 1);
            } else if (val < 0){
                setMinFilter(0);
            } else {
                setMinFilter(e.target.value);
            }
        }
        

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

    
      useEffect(() => {
        setCat(queryPar.get('category') || '');
        setSearchQuerry(queryPar.get('search') || '');
      },[queryPar]);


    return (
        <>
            {/*bg DIV*/}
            <div className='bg-neutral-900 min-h-screen'>
                <div className='container mx-auto py-10 px-5 max-w-7xl'>
                    {/*full div*/}
                    <div className='flex flex-row gap-15 items-start'>
                        {/*Filters div*/}
                        <div className='flex flex-col sticky top-10 w-60 gap-5 self-start bg-neutral-600 p-5 rounded-xl'>
                            <h1 className='text-4xl font-bold text-gray-100'>Filters:</h1>
                            {/*Order*/}
                            <div>
                                <h2 className='text-gray-100'>Sorting:</h2>
                                <select className='p-2 rounded-xl border-1 border-gray-100 text-gray-200' onChange={(e) => setSortBy(e.target.value)}>
                                    {
                                        sortingOptions.map((o) => (
                                            <option value={o.value} key={o.value} className="bg-neutral-800 text-gray-100">{o.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {/*Price range*/}
                            <div>
                                <h2 className='text-gray-100'>Price Range</h2>
                                <div className='flex justify-between gap-1'>
                                    <input type='number' min={0} value={minFilter} onChange={(e) => handleMinPriceFilterChange(e)} className='w-full min-w-0 border-1 border-gray-100 rounded text-gray-200 font-bold pl-1'></input>
                                    <p>-</p>
                                    <input type='number' min={minFilter} max={9999} value={maxFilter} onChange={(e) => handleMaxPriceFilterChange(e)} className='w-full min-w-0 border-1 border-gray-100 rounded text-gray-200 font-bold pl-1'></input>
                                </div>
                            </div>
                            {/*categories*/}
                            <div className=''>
                                <h2 className='text-gray-100 font-bold text-2xl mb-3'>Categories:</h2>
                                <div className='flex flex-col gap-4'>
                                    {navCategories.map((c) => {
                                        const isActive = cat === c.value
                                        return(
                                        <label key={c.value} className='flex items-center group cursor-pointer justify-between'>
                                            <div className='flex items-center'>
                                                {/*turned off radio button*/}
                                                <input 
                                                    type="radio" value={c.value} className='sr-only' name="category-filter" 
                                                    checked={isActive} onChange={(e) => setCat(e.target.value)}
                                                />
                                                {/* Category Name */}
                                                <p className={`transition-all duration-200 text-xl
                                                                ${isActive ? 'text-gray-100 font-bold translate-x-2'  
                                                                : 'text-neutral-900 font-medium group-hover:text-gray-200'}`}>
                                                    {c.name}
                                                </p>
                                            </div>
                                        </label>
                                        );
                                    })}
                                </div>
                            </div>
                            
                        </div>
                        {/*List div*/}
                        <div className='flex flex-col flex-1 mr-20'>
                            <div className='flex flex-col justify-center gap-3 overflow-hidden flex-shrink-0'>
                        {/*List*/}
                                {  
                                    filteredProducts.map((product) =>(
                                            <div className='flex items-center bg-neutral-600 rounded-xl' key={product.id}>
                                                <img src={product.image_url} alt={`${product.name} photo`} className='w-24 h-24 m-2 rounded-xl object-cover'></img>
                                                <div className='flex flex-col flex-1 ml-3'>
                                                    <h1 className='text-gray-100 font-bold flex-1 text-lg'>{product.name}</h1>
                                                    <p className='text-neutral-400'>Ratings: </p>
                                                    <p className='text-neutral-400 '>Spec:</p>
                                                </div>
                                                <p className='text-gray-100 mr-5 items-center font-bold text-lg'>{`$ ${product.price}`}</p>
                                                <button className='mr-5 bg-gray-100 px-2 rounded transition-all duration-200 hover:bg-red-500 cursor-pointer' onClick={() => onAdd(product)}>Add to Cart</button>
                                            </div>       
                                    ))
                                }
                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
