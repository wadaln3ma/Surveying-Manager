import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import { PointIdContextProvider } from './context/PointIdContext'
import { AuthContextProvider } from './context/AuthContext'
import { TasksContextProvider } from './context/TasksContext'
import { UsersContextProvider } from './context/UsersContext'
import { PointsContextProvider } from './context/PointsContext'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <TasksContextProvider>
    <UsersContextProvider>
    <PointsContextProvider>
    <PointIdContextProvider>
        <Router >
        <div className="bg-gradient-to-r from-green-400 to-blue-500 w-full h-screen overflow-scroll md:px-96 no-scrollbar font-handlee font-bold">
            <App />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                progress={1}
            />
        </div>
        </Router>
    </PointIdContextProvider>
    </PointsContextProvider>
    </UsersContextProvider>
    </TasksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
