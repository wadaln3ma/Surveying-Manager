import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Task from './pages/Task'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import {ConfirmDialog } from 'primereact/confirmdialog'
import { useAuth } from './hooks/useAuth'
import PrivateRoutes from './utils/PrivateRoutes'
import AdminRoutes from './utils/AdminRoutes'

export default function App(){
    const { user } = useAuth()

    return(
        <>
            <Header />
            <Routes>
                <Route element={<PrivateRoutes />}>
                <Route exact 
                    path="/" element={<Tasks/>}/>
                <Route path="/task/:taskName" 
                    element={<Task />} />
                <Route element={<AdminRoutes />}>
                    <Route path='/dashboard'
                           element={<Dashboard />} />
                </Route>
                </Route>

                <Route path="/login" 
                    element={!user ? <Login/> : <Navigate to="/" />} />

                <Route path="/signup" 
                    element={!user ? <Signup/> : <Navigate to="/" />} />
                
                
                <Route path="*" 
                    element={<NotFound/>}/>
            </Routes>

            <ConfirmDialog />
        </>
    )
}
