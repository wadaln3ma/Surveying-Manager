import React from 'react'
import { Link } from 'react-router-dom'
import { useTasksContext } from '../hooks/useTasksContext'
import { MdSearch,
         MdOutlineDelete,
         MdDownload
} from 'react-icons/md'
import { toast, Flip } from 'react-toastify'
import { confirmDialog } from 'primereact/confirmdialog'
import { useAuth } from '../hooks/useAuth'

 export default function TaskIteme({ id, name, description, toastRef }){
    const { user } = useAuth()

     const { dispatch } = useTasksContext()

     const downloadFileAtUrl = async(url)=>{
         const res = await fetch(url, {
             method: 'GET',
             headers: {
                 Authorization: `Bearer ${user.accessToken}`
             }
         })

         const blob = await res.blob()

         if(!res.ok){
            toastRef.current.show({ severity: 'warn', summary: 'Canceled', detail: 'task is empty', life: 3000 })
         }

         if(res.ok){
            const blobURL = window.URL.createObjectURL(new Blob([blob]))
             const aTag = document.createElement('a')
             aTag.href = blobURL
             const fileName= url.split('/').pop()
             aTag.setAttribute('download', `${fileName}.csv`)
             document.body.appendChild(aTag)
             aTag.click()
             aTag.remove()
         }
     }
    
    // handle task deleting
    const deleteTask = async (id)=>{
        const toastId = toast.loading("Deleting Task...")
        const res = await fetch(`/api/v1/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })

        const json = await res.json()

        if(!res.ok){
            toast.update(toastId, {
                render: "Could not delete Task, Try Again",
                type: 'error',
                isLoading: false,
                autoClose: 3000,
                delay: 1500,
                closeButton: true,
                transition: Flip
            })
            setTimeout(()=>{
                toast.dismiss()
            }, 3000)
        }

        if(res.ok){
            dispatch({ type: 'DELETE_TASK', payload: json.deleted._id })
            toast.update(toastId, 
                {
                    render: "Task Deleted Successfully",
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                    delay: 1500,
                    transition: Flip,
                    closeButton: true
            })
            setTimeout(()=>{
                toast.dismiss()
            }, 3000)
        }
    }

    const reject = () => {
        toastRef.current.show({ severity: 'warn', summary: 'Canceled', detail: 'No record Deleted', life: 3000 })
    }


const handleDeleteTask = async (e)=>{
    e.preventDefault()
    confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: ()=> deleteTask(id),
            reject
        })
}


    return(
        <div 
            className="flex w-full justify-between items-center rounded-md my-5 px-5 py-1 border-l-4 border-violet-500">
        <Link 
            to={`/task/${name}`}> 
            <p className="text-xl font-semibold text-gray-100">{name}</p>
            <p className="text-sm text-white pl-5">{description}</p>
        </Link>
            <div className="flex p-2 gap-2">
            <button className="bg-red-500 rounded-lg text-white flex items-center justify-center p-1"
            onClick={e => handleDeleteTask(e,id)}>
            <MdOutlineDelete 
                className=""/>
            </button>

            <button
               onClick={()=> downloadFileAtUrl(`/api/v1/tasks/download/${name}`)}
            className="flex items-center justify-center gap-1 bg-green-500 rounded-md text-white px-2 py-1"
            >
            <MdDownload className="text-md"/> 
            <span className="text-sm font-semibold">CSV</span>
            </button>
            </div>

        </div>

)}
