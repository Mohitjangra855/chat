import {toast} from "react-toastify"
import React from "react"
import {Outlet,Navigate} from "react-router-dom"
import {useAuth} from "./Components/Context/AuthContext"
 export const VerifyUser = ()=>{
    const {authUser} = useAuth();
    return authUser ? <Outlet/> : <Navigate to="/api/auth/login" />
 }
export const handleSuccess = (msg)=>{
    toast.success(msg,{position:"top-right"})
}
export const handleError = (msg)=>{
    toast.error(msg,{position:"top-right"})
}