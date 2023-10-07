import React from 'react'
import { PointIdContext } from '../context/PointIdContext'

export const usePointId = ()=>{
    const context = React.useContext(PointIdContext)

    if(!context){
        throw new Error("Point Id context should only be used inside a point id provider")
    }

    return context
}
