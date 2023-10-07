import React from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { useSignup } from '../hooks/useSignup'
import { FaUserSecret } from 'react-icons/fa'

export default function Signup(){
    const [name, setName] = React.useState("" )
    const [email, setEmail] = React.useState("" )
    const [password, setPassword] = React.useState("" )
    const { signup, errorStatus, errorMessage, isLoading } = useSignup()

    //hanlde login
    const handleSignup = async (e)=>{
        e.preventDefault()
        await signup(name, email, password)
    }

    if(isLoading) return <Loading />

    return(
        <div className="flex items-center justify-center w-full h-screen">
            <form onSubmit={handleSignup}
                className="relative flex flex-col px-8 sm:px-12 md:px-16 py-10 gap-3 bg-gradient-to-r from-blue-400 to-red-400 rounded-lg shadow-md w-96 max-w-[80%] sm:max-w-[80%] md:w-[30rem] lg:max-w-[60%]">

                <FaUserSecret className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-center text-black shadow-md bg-gradient-to-b from-transparent via-white to-white p-1 rounded-full" height='90px' size={50}/>
                
                <div className="flex flex-col gap-1 mt-5 md:mt-12">
                    <label className="text-gray-200 text-sm"
                        htmlFor="name">
                        Full Name
                    </label>
                    <input type="text" id="name" name="name" 
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="border rounded-md px-3 py-1 shadow-md focus:outline-none text-sm font-semibold bg-gray-200 font-roboto"/>
                </div>
                
                <div className="flex flex-col gap-1">
                    <label className="text-gray-200 text-sm"
                        htmlFor="email">
                        Email Address
                    </label>
                    <input type="email" id="email" name="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="border rounded-md px-3 py-1 shadow-md focus:outline-none text-sm font-semibold bg-gray-200 font-roboto"/>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-gray-200 text-sm"
                        htmlFor="password">
                        Password
                    </label>
                    <input type="password" id="password" name="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="border rounded-md px-3 py-1 shadow-md focus:outline-none text-sm font-semibold bg-gray-200 font-roboto"/>
                </div>
                <div className="flex items-center justify-center pt-5">
                    <input type="submit" value="Signup"
                        className="bg-transparent rounded-lg shadow-md px-10 py-1 text-center text-gray-200 font-bold cursor-pointer font-handlee"/>
                </div>

                <div className="text-sm flex items-center justify-center gap-1">
                    <span>
                    Allready have an account?
                    </span>
                    <Link to="/login"
                        className="text-blue-500 cursor-pointer">
                    Login
                    </Link>
                </div>
                
                {errorMessage && 
                <div className='flex flex-col p-2 justify-center border border-red-500 rounded-sm mt-5 text-white bg-transparent shadow-lg text-xs'>
                    {errorMessage?.split('.').map(err =>
                        <p className="text-red-500">- {err}</p>
                    )}
                </div>
                }
            </form>
        </div>
    )
}
