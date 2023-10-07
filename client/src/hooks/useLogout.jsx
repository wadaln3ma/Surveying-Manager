import React from 'react'
import { useAuth } from './useAuth'
import { toast, Flip } from 'react-toastify'

export const useLogout = ()=>{
    const { user, dispatch } = useAuth()

    const logout = async ()=>{
        const toastId = toast.loading('signing out...')
        const res = await fetch('/api/v1/users/logout', {
            method: 'GET',
            headers:{
                'authorization': `Bearer ${user.accessToken}`
            }
        })

        const data = await res.json()

        if(res.ok){
            toast.update(toastId, {
                render: data.message,
                type: 'success',
                delay: 1500,
                isLoading: false,
                closeButton: true,
                transition: Flip
            })
            dispatch({type: 'LOGOUT'})
        }

        if(!res.ok){
            toast.update(toastId, {
                render: data.message,
                type: 'error',
                isLoading: false,
                closeButton: true,
                delay: 1500,
                transition: Flip
            })
        }

        setTimeout(()=>{
            toast.dismiss()
        }, 2000)

    }

    return { logout }
}
