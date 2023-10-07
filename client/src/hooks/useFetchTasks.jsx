import React from 'react'
import {useTasksContext} from './useTasksContext'
import { useAuth } from './useAuth'

export const useFetchTasks = ()=>{
    const { user } = useAuth()
    const { dispatch } = useTasksContext()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    let tried = false
    
    const getTasks = async (term, itemsPerPage, page)=>{
        setLoading(true)
        setError(null)
        const res = await fetch(`/api/v1/tasks/${term? term: 'none'}?items_per_page=${itemsPerPage}&page=${page}`, {
                method: 'GET',
            headers:{
                Authorization: `Bearer ${user.accessToken}`
            }
            })

            const json = await res.json()

            if(!res.ok){
                if(!tried){
                    tried = true
                    return getTasks(term, itemsPerPage, page)
                }
                if(tried){
                setLoading(false)
                setError('something went wrong, try again')
                }
            }
            
            if(res.ok){
                dispatch({ type: 'SET_TASKS', payload: json })
                setLoading(false)
            }
    }

    return { getTasks, loading, error }
}
