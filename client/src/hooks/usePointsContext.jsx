import React from 'react'
import { PointsContext } from '../context/PointsContext'

export const usePointsContext = ()=>{
    const contetx = React.useContext(PointsContext)

    if(!context){
        throw new Error('ponis context must be used inside a points context provider scope')
    }

    return context
}
