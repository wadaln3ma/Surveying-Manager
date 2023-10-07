import React from 'react'
import { useAuth } from './useAuth'
import { toast, Flip } from 'react-toastify'


export const useLogin = ()=>{
    const [errorStatus, setErrorStatus] = React.useState(null)
    const [errorMessage, setErrorMessage] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const { dispatch } = useAuth()

    const login = async (email, password)=>{
        const toastId = toast.loading('Signing in ...')
        setIsLoading(true)
        setErrorStatus(null)
        setErrorMessage(null)
        const res = await fetch('/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json()

        if(!res.ok){
            toast.update(toastId, {
                render: data.message,
                isLoading: false,
                type: 'error',
                closeButton: true,
                delay: 1500,
                transition: Flip
            })
            setErrorStatus(data.statusCode)
            setErrorMessage(data.message)
            setIsLoading(false)
        }

        if(res.ok){
            toast.update(toastId, {
                render: data.message,
                type: 'success',
                isLoading: false,
                delay: 1500,
                closeButton: true,
                transition: Flip
            })
           dispatch({ type: 'LOGIN', payload: data }) 
        }
        setTimeout(()=>{
            setIsLoading(false)
            toast.dismiss()
        }, 3000)
    }

    return {login, errorStatus, errorMessage, isLoading}
}
