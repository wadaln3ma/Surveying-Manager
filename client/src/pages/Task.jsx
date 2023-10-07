import React from 'react'
import { useParams } from 'react-router-dom'
import AddPointModal from '../components/AddPointModal'
import PointItem from '../components/PointItem'
import Loading from '../components/Loading'
import { toast, Flip } from 'react-toastify'
import { Link } from 'react-router-dom'
import { usePointId } from '../hooks/usePointId'
import { useAuth } from '../hooks/useAuth'
import { 
         MdEdit,
         MdOutlineDelete } from 'react-icons/md'
import { confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'

export default function Task(){
    const { user } = useAuth()
    const [data, setData] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const { taskName } = useParams()
    const toastRef = React.useRef(null)
    const {pointId, setPointId} = usePointId()

    const getPoints = async ()=>{
            setLoading(true)
            const res = await fetch(`/api/v1/points/${taskName}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            })
            const json = await res.json()
            if(!res.ok){
                setLoading(false)
                console.log('something went wrong')
            }

            if(res.ok){
                setLoading(false)
                setData(json.points)
            }

        }

    React.useEffect(()=>{

                getPoints()

    }, [])

    // delete a point
    const deletePoint = async(id)=>{
        const toastId = toast.loading("deleting point")

        const res = await fetch(`/api/v1/points/${id}`, {
            method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
        })

        const json = await res.json()

        if(!res.ok){
            toast.update(toastId, {
                render: json.message,
                type: "error",
                isLoading: false,
                delay: 1500,
                closeButton: true,
                transition: Flip
            })
            setTimeout(()=>{
                toast.dismiss()
            }, 3000)
        }

        if(res.ok){
            toast.update(toastId, {
                render: 'Point deleted successfully',
                type: "success",
                isLoading: false,
                closeButton: true,
                delay: 1500,
                transition: Flip
            })
            setTimeout(()=>{
                toast.dismiss()
                getPoints()
            }, 3000)
        }
    }

    const reject = () => {
        toastRef.current.show({ severity: 'warn', summary: 'Canceled', detail: 'No record Deleted', life: 3000 })
    }

    // handle deleting a point
    const handleDelete = (e, id)=>{
        e.preventDefault()
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: ()=> deletePoint(id),
            reject
        })

    }

    //Loading ...
    if(loading) return <div className="flex justify-center items-center">
            <Loading />
        </div>

    return(

        <div className="flex flex-col w-full h-screen">
        
            <h1 className="text-center text-4xl font-bold p-10 md:text-5xl text-gray-200">{taskName}</h1>
            <div className="flex flex-col gap-5 p-3">
        {data && data.map((point) => <div key={point._id} className="flex flex-col gap-2">
            <div
            className="flex justify-between items-center border border-gray-400 rounded-t-md py-2">

        <p className="font-bold pl-5 text-white">
            {point.name}
            </p>

            <div className="flex gap-1">
            <button 
                onClick={e => {
                setPointId(point._id)
                setShowModal(true)
            }}

                className="flex items-center justify-center rounded-full cursor-pointer bg-transparent shadow-md text-white p-2 mr-3">
                <MdEdit 
                    className=""/>
            </button>

            <button 
                onClick={e => handleDelete(e,point._id)}
                className="flex items-center justify-center rounded-full cursor-pointer bg-red-500 text-white p-2 mr-3">
                <MdOutlineDelete
                    className=""/>
            </button>
            </div>

            </div>

            <p className="bg-transparent shadow-md  pl-8 text-gray-700">{point.remarks}</p>

            </div>

        )}

            <div className="flex w-full justify-center p-4">
                <button 
                    className="border-2 border-gray-200 text-gray-200 rounded-md px-10 py-1 text-center shadow-sm shadow-blue-300"
                    onClick={e => setShowModal(true)}>
                    Add
                </button>
            </div>
            </div>
            <AddPointModal open={showModal} 
                onClose= {e => {
                        setShowModal(false)
                        setPointId(null)
                    }
                } 
                taskName={taskName} reload={()=> getPoints()}/>

               <Toast ref={toastRef}/>

        </div>
    )
}
