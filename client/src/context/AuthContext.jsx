import React from 'react'
import Loading from '../components/Loading'

export const AuthContext = React.createContext()

export const authReducer = (state, action)=>{
    switch(action.type){
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({children})=>{
    const [isLoading, setIsLoading] = React.useState(false)
    const [state, dispatch] = React.useReducer(authReducer, { user: null })

    const getAuthUser = async ()=>{
        setIsLoading(true)
        const res = await fetch('/api/v1/users/refreshToken', {
                method: 'GET',
                headers: {
                    credentials: 'include'
                }
        }) 

        const data = await res.json()

        if(!res.ok){
            setIsLoading(false)
            return
        }

        if(res.ok){
            setIsLoading(false)
            dispatch({ type: 'LOGIN', payload: data })
            setTimeout(()=>{
                getAuthUser()
            }, (data.expiresIn * 60 * 1000) - 500)
        }
    }


    React.useEffect(()=>{

        if(!state.user) getAuthUser()

    },[])

    return(
    <AuthContext.Provider value={{...state, dispatch}}>
        {!isLoading ?
        children : <Loading />}
    </AuthContext.Provider>
    )
}
