//import { useState , useEffect} from 'react'
import { Link } from 'react-router-dom';

export const AboutPage = () => {

 
    return (
        <>
            <div className='bg-gray-80 min-h-screen py-10'>
                <h1 className='text-4xl font-bold text-center text-gray-900 border-b-2 pb-4'>About Page</h1>
                <div>
                  <div>
                    <Link 
                      to={"/"} 
                      className="bg-indigo-600 text-white p-2 rounded">
                      {"Home Page"}
                    </Link>                  
                  </div>
                  <div>
                    <Link 
                      to={"/shop"} 
                      className="bg-indigo-600 text-white p-2 rounded">
                      {"Shop"}
                    </Link>
                  </div>
                </div>
            </div>
        </>
    )
}
