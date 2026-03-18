//import {  useEffect } from 'react'
import { Link } from 'react-router-dom';



export const CheckoutPage = ({onClear, items, onQuantityChange, order}) => {





    
    return (
        <>
            <div className='bg-gray-80 min-h-screen py-10'>
                {/*All div*/}
                <div className='container mx-auto px-15 relative'>
                    <h1 className='text-4xl font-extrabold text-center text-gray-900 border-b-2 pb-4 border-indigo-600'>Checkout</h1>
                    <Link 
                        to={"/shop"} 
                        className="bg-indigo-600 text-white p-2 rounded-b block w-24 font-semibold text-center">
                        {"Shop"}
                    </Link>
                    <button onClick={() => onClear()} className='bg-red-500 text-white p-2 rounded cursor-pointer relative -right-243 -top-1 hover:bg-red-700'>Clear Cart</button>
                    {/*Singular cart line div*/}
                    <div className='flex flex-col ring-1 rounded max-w-1/2 mx-auto overflow-hidden flex-shrink-0'>
                        {/*Cart rendering conditons*/}
                        { items.length === 0 ? (
                            <div>
                                <h1 className='text-2xl font-semibold ml-4 flex-1'>Your cart is empty</h1>
                            </div>
                        ) :  
                        items.map((cartItem) =>(
                                <div className='flex items-center border-t-1 border-b-1 border-gray-300 mt-2 py-1'>
                                    <img src={cartItem.image_url} alt={`${cartItem.name} photo`} className='w-24 h-24 border-1 ml-2 rounded object-scale-down'></img>
                                    <h1 className='text-2xl font-semibold ml-4 flex-1 ml-10'>{cartItem.name}</h1>
                                    <input type='number' defaultValue={cartItem.quantity} onChange={(e) => onQuantityChange(cartItem, parseInt(e.target.value))} onKeyDown={(e) => e.preventDefault()} className='w-10 text-center mr-5  rounded text-center' min={1}></input>
                                    <p className='w-24 text-right mr-10'>{`$ ${cartItem.price * cartItem.quantity}`}</p>
                                    {/*implement remove logic*/}
                                    <button className='mr-5 bg-red-400 px-2 rounded hover:bg-red-500 cursor-pointer'>&#xD7;</button>
                                </div>   
                                
                        ))
                        }
                        <button className='bg-indigo-600 text-white p-2 rounded-b cursor-pointer hover:bg-indigo-700' disabled={items.length === 0} onClick={() => order()}>Order</button>
                    </div>
                </div>
            </div>
        </>
    )
}
