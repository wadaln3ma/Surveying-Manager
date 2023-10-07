import React from 'react'

export const PointsContext = React.createContext()

export const pointsReducer = (state, action)=>{
    switch(action.type){
        case 'SET_POINTS':
            return {
                points: actions.payload
            }
        case 'ADD_POINT':
            return {
                points: [action.payload, ...state.points]
            }
        case 'DELETE_POINT':
            return {
                points: state.points.filter(point => pints._id !== acion.payload._id)
            }
        default:
            return state
    }
}

export const PointsContextProvider = ({children})=>{
    const [ state, dispatch ] = React.useReducer(pointsReducer, { points: null })

    return(
    <PointsContext.Provider value={{...state, dispatch}}>
        { children }
    </PointsContext.Provider>
    )
}
