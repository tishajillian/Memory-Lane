import { useAuthContext } from "./useAuthContext"
import { useJournalsContext } from "./useJournalsContext"
// import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: journalDispatch} = useJournalsContext()
    // const navigate = useNavigate()
    
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')
        
        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        // navigate(`/login`)
        journalDispatch({type: 'SET_JOURNALS', payload: null})
    }
    return{logout}

}