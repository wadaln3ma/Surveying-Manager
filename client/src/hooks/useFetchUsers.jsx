import React from 'react'
import { useAuth } from './useAuth'
import { useUsersContext } from './useUsersContext'

export const useFetchUsers = ()=>{
    const {user} = useAuth()
    const { dispatch } = useUsersContext()
    const [isLoading, setIsLoading] = React.useState(false)
    const [errorStatus, setErrorStatus] = React.useState(null)
    const [errorMessage, setErrorMessage] = React.useState(null)

    const getUsers = async ()=>{
        setIsLoading(true)
        setErrorMessage(null)
        setErrorStatus(null)
        const res = await fetch('/api/v1/users', {
            method: 'GET',
            headers:{
                Authorization : `Bearer ${user.accessToken}`
            }
        }) 

        const json = await res.json()

        if(!res.ok){
            setIsLoading(false)
            setErrorStatus(json.statusCode)
            setErrorMessage(json.message)
        }

        if(res.ok){
            setIsLoading(false)
            dispatch({type: 'SET_USERS', payload: json.users})
        }
    } 

    return { getUsers, isLoading, errorStatus, errorMessage }
}
