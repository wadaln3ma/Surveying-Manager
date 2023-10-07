import React from 'react'
import { UsersContext } from '../context/UsersContext'

export const useUsersContext = ()=>{
    const context = React.useContext(UsersContext)

    if(!context){
        throw new Error('UsersContext Should be used inside a users context porvider')
    }

    return context
}
