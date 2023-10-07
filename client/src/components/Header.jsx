import React from 'react'
import { Link } from 'react-router-dom'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { useAuth } from '../hooks/useAuth'
import { useLogout } from '../hooks/useLogout'
import jwtDecode from 'jwt-decode'
import { MdHome } from 'react-icons/md'

export default function Header(){
    const { user } = useAuth()
    const { logout } = useLogout()

    if(!user) return null

    const decoded = jwtDecode(user?.accessToken)

    return(
        <header className="w-full ">
            {
                user && 
                <div className="flex w-full items-center justify-between px-3 py-2">
        
                    <Link to="/"
                    className="text-sm font-semibold text-gray-200">
                    <MdHome className="border-3 text-3xl bg-transparent shadow-md rounded-full p-1"/>
                    </Link>

                    <div className="flex gap-2 items-center">
                    <span className="text-sm font-semibold text-gray-200">{decoded?.userInfo?.name}</span>
                    <RiLogoutCircleLine 
                        onClick={logout}
                        className="bg-transparent shadow-md p-1 rounded-full text-3xl text-red-500 cursor-pointer"/>
                    </div>

                </div>
            }
        </header>
    )
}
