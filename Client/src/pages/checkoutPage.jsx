import {  useEffect } from 'react'




export const CheckoutPage = ({onClear, items}) => {

    useEffect(() => {
        if(items){
            console.log(items)
        }else{
            console.log("items not found")
        }
        
    
      },);



    {/*styling info - make div that take arount 2/3 of site in the middle and in it create item divs*/}
    return (
        <>
            <div className='bg-gray-80 min-h-screen py-10'>
                <h1 className='text-4xl font-bold text-center text-gray-900 border-b-2 pb-4'>Checkout</h1>
                <button onClick={() => onClear()} className='bg-red-500 text-white p-2 rounded'>Clear Cart</button>
                <div className='flex flex-col ring-1 ring-gray-300 mt-4 mr-10'>
                    {items.map((cartItem) =>(
                            <div className='flex items-center ring-1 mt-2'>
                                <img src={cartItem.image_url} alt={`${cartItem.name} photo`} className='w-24 h-24'></img>
                                <h1 className='text-2xl font-semibold ml-4 flex-1'>{cartItem.name}</h1>
                                <p className='w-20 text-center'>quanity</p>
                                <p className='w-24 text-right'>{`$ ${cartItem.price}`}</p>
                            </div>   
                    ))}
                </div>
                <button className='bg-indigo-600 text-white p-2 rounded'>Order</button>
            </div>
        </>
    )
}
