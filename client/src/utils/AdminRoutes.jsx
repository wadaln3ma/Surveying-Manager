import { Navigate, Outlet, useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useAuth } from '../hooks/useAuth'

export default ()=>{
    const { user } = useAuth()
    const location = useLocation()

    const decoded = jwtDecode(user.accessToken)

    return (
        decoded.userInfo?.role === 'admin' ? <Outlet /> : <Navigate to="/login" 
            state={{from: location}} replace/>
    )
}
