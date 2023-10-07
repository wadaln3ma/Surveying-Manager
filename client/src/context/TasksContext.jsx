import React from 'react'

export const TasksContext = React.createContext()

export const tasksReducer = (state, action)=>{
    switch(action.type){
        case 'SET_TASKS':
            return {
                tasks: action.payload.tasks,
                count: action.payload.pagination.count,
                pageCount: action.payload.pagination.pageCount
            }
        case 'CREATE_TASK':
            return {
                tasks: [action.payload, ...state.tasks],
                        ...state.count,
                        ...state.pageCount,
            }
        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter(task => task._id !== action.payload),
                ...state.count,
                ...state.pageCount,
            }
        default:
            return state
    }
}

export const TasksContextProvider = ({children})=>{
    const [state, dispatch] = React.useReducer(tasksReducer, { tasks: null,count: null, pageCount: null })

    return(
    <TasksContext.Provider value={{...state, dispatch}}>
        {children}
    </TasksContext.Provider>
    )
}
