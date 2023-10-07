import React from 'react'
import {TasksContext} from '../context/TasksContext'

export const useTasksContext = ()=>{
    const context = React.useContext(TasksContext)

    if(!context){
        throw new Error('Tasks context must be used inside a tasks context peovider scope')
    }

    return context
}
