import React from 'react'
import {toast, Bounce, Flip} from 'react-toastify'
import { MdError } from 'react-icons/md'
import { useAuth } from '../hooks/useAuth'
import { useTasksContext } from '../hooks/useTasksContext'


export default function AddTaskModal({open, onClose, reload}){
    const { user } = useAuth()
    const { dispatch } = useTasksContext()
    const [title, setTitle] = React.useState("")
    const [desc, setDesc] = React.useState("")
    const [error, setError] = React.useState(null)
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const id = toast.loading("Adding Task ...")

        const newTask = {
            name: title,
            description: desc
        }

        const res = await fetch('/api/v1/tasks', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.accessToken}`
            }
        })
        

        if(!res.ok){
            if(res.status === 409){
                setError("Task Already Exists")
            }
            else{
                setError('something went wrong')
            }
            toast.update(id, {
                render: "Couldn't Add Task, Try Again",
                type: "error",
                isLoading: false,
                delay: 1500,
                closeButton: true,
                transition: Flip
            })
            setTimeout(()=>{
                toast.dismiss()
            }, 3000)
            return
        }

        if(res.ok){
            setError(null)
            const data = await res.json()
            dispatch({ type: 'CREATE_TASK', payload: data.newTask })
            toast.update(id, {
                render: "Task Added Successfully",
                type: "success",
                isLoading: false,
                delay: 1500,
                closeButton: true,
                transition: Flip
            })

            setTimeout(()=>{
                reload()
                onClose()
                toast.dismiss()
            }, 3000)
        }

    }

    if(!open) return null

    return(
        <div 
            className="fixed inset-x-0 inset-y-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
        
            <div 
                className="flex items-center text-gray-200">
                <form onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-blue-500 rounded-lg shadow-4xl px-10 pt-10 pb-3 gap-2">
                    <div 
                        className="flex flex-col gap-1">
                    <label htmlFor="title"
                        className="text-sm font-bold">
                    Enter Task Name
                    </label>

                    <input type="text" id="title"  name="title" required 
                        className="border border-gray-200 cursor-pointer rounded-md px-3 py-1 text-gray-600"
                        value={title} 
                        onChange={e => setTitle(e.target.value)}/>

                    </div>

                    <div 
                        className="flex flex-col gap-1">
                        <label htmlFor="desc"
                            className="text-sm font-bold">
                            description
                        </label>

                        <input type="text" id="desc" name="desc" 
                            className="border border-gray-200 px-3 py-1 rounded-md text-gray-600"
                            value={desc} 
                            onChange={e => setDesc(e.target.value)}/>

                    </div>

                    <div
                        className="flex items-center gap-4 mt-7">
                        <input type="submit" value="Save Task" 
                            className="border-2 border-gray-200 cursor-pointer rounded-md px-3"/>

                        <button
                        className="border-2 border-gray-200 cursor-pointer rounded-md px-3"
                        onClick={onClose}>
                            Cancel
                        </button>
                    </div>

                    {error && <div className="mt-3">
                        <p className="flex items-center text-sm text-red-600 border border-white bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 p-1 px-2 py-1 rounded-md">
                        <MdError className="text-2xl pr-1 text-red-600"/>
                        {error}
                        </p>
                    </div>}


                </form>
            </div> 

        </div>
    )
}
