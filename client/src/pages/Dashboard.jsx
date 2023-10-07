import React from 'react'
import { useFetchUsers } from '../hooks/useFetchUsers'
import { useUsersContext } from '../hooks/useUsersContext'
import UserListItem from '../components/UserListItem'
import Loading from '../components/Loading'
import { Toast } from 'primereact/toast'

export default function Dashboard(){
    const { users } = useUsersContext()
    const { getUsers, errorStatus, errorMessage, isLoading } = useFetchUsers()
    const toastRef = React.useRef(null)

    React.useEffect(()=>{
        getUsers()
    },[])

    if(isLoading) return <Loading />

    return(
        <div className="flex flex-col gap-5 items-center">

            <div className="text-4xl my-10">
                Users List
            </div>

            <div>
            <table className="table-auto border-2 border-slate-200 shadow-2xl p-2 rounded-md">
                <thead className="text-gray-200 border-b-2 border-slate-200">
                    <tr className="">
                        <th className="px-6 py-2">Name</th>
                        <th className="px-6 py-2 border-x-2">Role</th>
                        <th className="px-6 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
        { users && users.map(user =>
            <UserListItem current={user} toastRef={toastRef} key={user._id}/>
        ) }
            </tbody>
            </table>
            </div>

            <Toast ref={toastRef}/>
        </div>
    )
}
