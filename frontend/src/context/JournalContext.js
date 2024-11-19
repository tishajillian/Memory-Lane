import {createContext, useReducer} from 'react'

export const JournalsContext  = createContext()

export const journalsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_JOURNALS':
            return {
                journals: action.payload
            }
        case 'CREATE_JOURNAL':
            return {
                journals: [action.payload, ...state.journals]
            }
        default: 
            return state
    }
}

export const JournalsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(journalsReducer, {
        journals: null
    })
    
    return (
        <JournalsContext.Provider value={{...state, dispatch}}>
            {children}
        </JournalsContext.Provider>
    )
}