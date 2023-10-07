import React from 'react'
import { AuthContext } from '../context/AuthContext'

export const useAuth = ()=>{
    const context = React.useContext(AuthContext)

    if(!context){
        throw new Error('AuthContext must be used inside an auth context provider scope')
    }

    return context
}
