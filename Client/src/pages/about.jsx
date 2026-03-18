//import { useState , useEffect} from 'react'
import { Link } from 'react-router-dom';

export const AboutPage = () => {

 
    return (
        <>
            <div className='bg-gray-80 min-h-screen py-10'>
                <h1 className='text-4xl font-extrabold text-center text-gray-900 border-b-2 pb-4 border-indigo-600'>About Page</h1>
                {/*Nav div*/}
                <div className=' grid grid-cols-3'>
                  <div className='flex justify-center'>
                    <Link 
                      to={"/"} 
                      className="bg-indigo-600 text-white p-2 rounded-b w-2/3 block text-center font-semibold">
                      {"Home"}
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
                      className="bg-indigo-600 text-white p-2 rounded-b w-2/3 block text-center justify-right font-semibold">
                      {"Cart"}
                    </Link>
                  </div>
                </div>
                <div className='mt-15 ml-3'>
                  <h1 className='text-4xl font-bold' >History:</h1>
                  <div className='max-w-1/2'>
                    <p className='font-semibold'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla enim tortor, 
                    imperdiet eget tortor quis, scelerisque porttitor risus. Sed suscipit justo quis dui condimentum pharetra. Nunc non posuere risus. 
                    Sed euismod dignissim nisl id pulvinar. Phasellus eu ultrices risus, in tempor lectus. Etiam sit amet sodales erat. 
                    Vivamus eleifend est sed facilisis blandit. Sed leo nunc, eleifend quis cursus sit amet,
                     maximus ut erat. Ut nec ipsum pellentesque, volutpat odio ut, interdum nunc. Ut aliquam mollis sem, at interdum 
                     lorem molestie at. Maecenas sit amet consequat orci.</p>
                  </div>
                  
                </div>
            </div>
        </>
    )
}
