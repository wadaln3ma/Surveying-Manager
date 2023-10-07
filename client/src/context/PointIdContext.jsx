import React from 'react'

export const PointIdContext = React.createContext()

export const PointIdContextProvider = ({children})=>{
    const [pointId, setPointId] = React.useState(null)

    return(
        <PointIdContext.Provider value={{pointId, setPointId}}>
            {children}
        </PointIdContext.Provider>
    )
}
