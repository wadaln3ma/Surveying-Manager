import React from 'react'
import { MdDelete } from 'react-icons/md'
import { useAuth } from '../hooks/useAuth'
import { useUsersContext } from '../hooks/useUsersContext'
import { toast, Flip } from 'react-toastify'
import { confirmDialog } from 'primereact/confirmdialog'

export default function UserListItem({current, toastRef}){
    const { user } = useAuth()
    const { dispatch } = useUsersContext()

    const deleteUser = async (userId)=>{
        const toastId = toast.loading('Deleting user...')
        const res = await fetch(`/api/v1/users/${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })

        const json = await res.json()
        console.log(json)

        if(!res.ok){
            toast.update(toastId, {
                render: json.message,
                type: 'error',
                delay: 1500,
                isLoading: false,
                closeButton: true,
                transition: Flip,
            })

            setTimeout(()=>{
                toast.dismiss()
            }, 2500)
        }

        if(res.ok){
toast.update(toastId, {
                render: json.message,
                type: 'success',
                delay: 1500,
                isLoading: false,
                closeButton: true,
                transition: Flip,
            })

            dispatch({ type: 'DELETE_USER', payload: json.user._id })

            setTimeout(()=>{
                toast.dismiss()
            }, 2500)
        }

    }

    const reject = () => {
        toastRef.current.show({ severity: 'warn', summary: 'Canceled', detail: 'No record Deleted', life: 3000 })
    }

    // handle deleting a point
    const handleDelete = (id)=>{
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: ()=> deleteUser(id),
            reject
        })

    }

    return(
        <tr className="text-gray-300">
            <td className="px-3 py-2">
            {current.name}
            </td>
            <td className="px-3 py-2 border-x-2 border-slate-200">
            {current.role}
            </td>
            <td className="px-3 py-2 text-red-400 flex items-center justify-center">
            <MdDelete className="text-lg cursor-pointer"
                onClick={()=> handleDelete(current._id)}/>
            </td>
        </tr>
    )
}
