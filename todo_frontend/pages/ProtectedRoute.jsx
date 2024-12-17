import { Navigate, Outlet } from "react-router-dom"
import { isAuthenticated } from "../public/auth"

export const ProtectedRoute =()=>{
    let user = null
    return isAuthenticated() ? <Outlet></Outlet>:<Navigate to={'/login'}></Navigate>
}