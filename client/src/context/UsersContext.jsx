import React from 'react'

export const UsersContext = React.createContext()

export const usersReducer = (state, action)=>{
    switch(action.type){
        case 'SET_USERS':
            return {
                users: action.payload
            }
        case 'DELETE_USERS':
            return{
                users: null,
            }
        case 'DELETE_USER':
            return {
                users: state.users.filter(user => user._id !== action.payload)
            }
        default:
            return state
    }
}

export const UsersContextProvider = ({children})=>{

    const [state, dispatch] = React.useReducer(usersReducer, { users: null })

    return(
    <UsersContext.Provider value={{...state, dispatch}}>
        {children}
    </UsersContext.Provider>
    )
}
