import { AuthContext } from './authContext'
import { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home } from 'lucide-react'



export const Register = () => {
    const { login } = useContext(AuthContext)
    const [username, setLogin] = useState("")
    const [pwd, setPwd] = useState("")

    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


  /*THIS IS LOGIN LOGIC FOR NOW CHANGE LATER*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, pwd)
        const res = await fetch("api/auth/login" , {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: pwd })
        });

        const data = await res.json()
        login(data.token)
        navigate(from)
    }



  return (
    <div className=' min-h-screen w-full flex-col flex items-center justify-center bg-neutral-900'>
        <div className='flex w-80 flex-col'>
            <div className='bg-neutral-600 px-5 py-10 rounded-xl shadow-sm '>
                <button className='cursor-pointer bg-neutral-600 hover:bg-neutral-500 p-1 rounded-md items-center mb-3' onClick={() => navigate("/")}>
                    <Home size={30} color='white'/>                   
                </button>
                <form onSubmit={console.log("register sumbited")} className='items-center'>
                    <h1 className='text-2xl font-bold text-gray-100'>Sign Up</h1>
                    <div className=' flex flex-col items-start pt-5'>
                        <input required type="text" placeholder="Name" onChange={e => setLogin(e.target.value)} className='mb-5 text-gray-100 border-1 border-gray-400 outline-none py-2 px-4 rounded-xl w-full'></input>
                        <input required type="text" placeholder="Last Name" onChange={e => setLogin(e.target.value)} className='mb-5 text-gray-100 border-1 border-gray-400 outline-none py-2 px-4 rounded-xl w-full'></input>
                        <input required type="text" placeholder="Username/E-mail" onChange={e => setLogin(e.target.value)} className='mb-5 text-gray-100 border-1 border-gray-400 outline-none py-2 px-4 rounded-xl w-full'></input>
                        <input required type="password" placeholder="Password" onChange={e => setPwd(e.target.value)} className='mb-3 text-gray-100 border-1 border-gray-400 outline-none py-2 px-4 rounded-xl w-full'></input>
                        <button className='p-3 rounded-xl bg-gray-100 w-full font-semibold cursor-pointer mt-5'>Sign Up</button>
                    </div>
                </form>
            </div>
            <p className='text-gray-100 underline cursor-pointer mt-3 self-end mr-5' onClick={() => navigate("/login")}>Already have an account? Sign in</p>
        </div>
        
        
        
    </div>
  )
}
