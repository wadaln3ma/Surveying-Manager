import React from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { useLogin } from '../hooks/useLogin'
import { FaUserSecret } from 'react-icons/fa'

export default function Login(){
    const [email, setEmail] = React.useState("" )
    const [password, setPassword] = React.useState("" )
    const { login, errorStatus, errorMessage, isLoading } = useLogin()

    //hanlde login
    const handleLogin = async (e)=>{
        e.preventDefault()
        await login(email, password)
    }

    if(isLoading) return <Loading />

    return(
        <div className="flex items-center justify-center w-full h-screen">
            <form onSubmit={handleLogin}
                className="relative flex flex-col px-8 sm:px-10 md:px-12 py-10 gap-3 bg-gradient-to-r from-blue-400 to-red-400 rounded-lg shadow-md w-96  max-w-[80%] sm:max-w-[65%] md:max-w-[60%]">

                <FaUserSecret className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-center text-black shadow-md bg-gradient-to-b from-transparent via-white to-white p-1 rounded-full" height='90px' size={50}/>
                
                <div className="flex flex-col gap-1 mt-5 md:mt-12">
                    <label className="text-gray-200 text-sm"
                        htmlFor="email">
                        Email Address
                    </label>
                    <input type="email" id="email" name="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="border rounded-md px-3 py-1 shadow-md focus:outline-none text-sm font-semibold bg-gray-200"/>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-gray-200 text-sm"
                        htmlFor="password">
                        Password
                    </label>
                    <input type="password" id="password" name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="border rounded-md px-3 py-1 shadow-md focus:outline-none text-sm font-semibold bg-gray-200"/>
                </div>
                <div className="flex items-center justify-center pt-5">
                    <input type="submit" value="login"
                        className="bg-transparent rounded-lg shadow-md px-10 py-1 text-center text-gray-200 font-bold cursor-pointer font-handlee"/>
                </div>

                <div className="text-sm flex items-center justify-center gap-1">
                    <span>
                    New to the site?
                    </span>
                    <Link to="/signup"
                        className="text-blue-500 cursor-pointer">
                    Signup
                    </Link>
                </div>
                
                
                {errorMessage && 
                <div className='flex items-center justify-center border border-red-500 mt-5 text-white bg-transparent shadow-lg'>
                <span>{errorMessage}</span> 
                </div>
                }
            </form>
        </div>
    )
}
