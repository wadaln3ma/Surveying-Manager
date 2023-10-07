import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { usePointId } from '../hooks/usePointId'
import { toast } from 'react-toastify'
import { MdError } from 'react-icons/md'

export default function AddPointModal({open, onClose, taskName, reload}){
    const { user } = useAuth()
    const { pointId, setPointId } = usePointId()
    const [title, setTitle] = React.useState("")
    const [longitude, setLongitude] = React.useState("")
    const [latitude, setLatitude] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [error, setError] = React.useState(null)
   
    // fetching point to populate input fields
    const fetchPoint = async (id)=>{
        const res = await fetch(`/api/v1/points/point/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })

        const json = await res.json()

        if(!res.ok){
            return
        }

        if(res.ok){
            setTitle(json.point.name)
            setLongitude(json.point.longitude)
            setLatitude(json.point.latitude)
            setDescription(json.point.remarks)
        }

    }

    // populating input fields on update case
    React.useEffect(()=>{
        setTitle("")
        setLongitude("")
        setLatitude("")
        setDescription("")
        if(pointId){
            fetchPoint(pointId)
        }
    },[pointId])

    //Geolocation API call
    const getLocation = ()=>{
        if ("geolocation" in navigator){

            const success = (p)=>{
                console.log(p.coords)
                setLongitude(p.coords.longitude)
                setLatitude(p.coords.latitude)
            }
        
        const options = {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 20000,
        }

        const error = (error)=>{
        console.log(error)
        }

        navigator.geolocation.getCurrentPosition(success, error, options)

        }
    }


    if(!open) return null

    //fetching location coordknates
    const handleClick = (e)=>{
        e.preventDefault()

        getLocation()
    }

    // Saving new point to DB
    const handleSave = async (e)=>{
        e.preventDefault()
        const id = toast.loading("Adding Point...")
        setError(null)
        const point = {name: title, longitude, latitude, remarks: description, taskName}
        const res = await fetch(`/api/v1/points/`, {
            method: 'POST',
            body: JSON.stringify(point),
            headers: {
                'Content-Type': 'application/json' ,
                Authorization: `Bearer ${user.accessToken}`
            }
        })
        

        const json = await res.json()

        if(!res.ok){
            setError(json.message)
            toast.update(id, {
                render: json.message,
                type: 'error',
                isLoading : false,
                closeButton: true,
                delay: 1500
            })
            setTimeout(()=>{
                toast.dismiss()
            }, 3000)
            return
        }

        if(res.ok){
            //handle ok response
            toast.update(id, {
                render: 'Point Added Successfully',
                type: 'success',
                isLoading: false,
                delay: 1500
            })
            setTimeout(()=>{
                reload()
                toast.dismiss()
                onClose()
            }, 3000)
        }

    }
    
    // Updating a point
    const handleUpdate = async (e)=>{
        e.preventDefault()
        const id = toast.loading("Updating Point...")
        setError(null)
        const point = {name: title, longitude, latitude, remarks: description, taskName}
        const res = await fetch(`/api/v1/points/${pointId}`, {
            method: 'PATCH',
            body: JSON.stringify(point),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.accessToken}`
            }
        })
        

        const json = await res.json()

        if(!res.ok){
            setError(json.message)
            toast.update(id, {
                render: json.message,
                type: 'error',
                isLoading : false,
                closeButton: true,
                delay: 1500
            })
            setTimeout(()=>{
                toast.dismiss()
            }, 3000)
            return
        }

        if(res.ok){
            //handle ok response
            toast.update(id, {
                render: json.message,
                type: 'success',
                isLoading: false,
                delay: 1500
            })
            setTimeout(()=>{
                reload()
                toast.dismiss()
                onClose()
            }, 3000)
        }

    }

    return(
    <div 
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
            
            <div>
                <form onSubmit={
                    !pointId ? handleSave : handleUpdate
                }
                    className="flex flex-col bg-white p-10 rounded-xl gap-3 bg-gradient-to-r from-red-500 to-blue-500 shadow-gray-500 shadow-xl text-white">

                    <div 
                        className="flex flex-col gap-1">
                        <label htmlFor="title"
                        className="text-sm font-bold">
                            Name
                        </label>
                        
                        <input type="text" id="title" name="title" required 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    className="border border-gray-200 rounded-md px-3 py-1 text-gray-600"/>
    
                    </div>  

                    <div>
    
                    <button onClick={handleClick}
                        className="border text-gray-300 rounded-md px-3 py-1">
                    Get Coordinates
                    </button>

                    </div>

                    <div 
                    className="flex flex-col gap-1">
                        <label htmlFor="longitude"
                        className="text-sm font-bold">
                            longitude
                        </label>
                        <input type="text" id="longitude" name="longitude" required
                        value={longitude}
                        onChange = {e => setLongitude(e.target.value)}
                        className="border border-gray-200 text-gray-600 rounded-md px-3 py-1"/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="latitude"
                        className="text-sm font-bold">
                            latitude
                        </label>
                        <input type="text" id="latitude" name="latitude" required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                        className="border border-gray-200 text-gray-600 rounded-md px-3 py-1"/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="desc" 
                        className="text-sm font-bold">
                         description
                        </label>
                        <input type="text" id="desc" name="desc" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="border border-gray-200 text-gray-600 rounded-md px-3 py-1"/>
                    </div>


                    <div className="flex items-center justify-center gap-3 mt-4">

                    <input type="submit" value={pointId ? "update" : "save"} 
                    className="border-2 border-gray-200 rounded-md px-4 font-bold cursor-pointer"/>

                    <button 
                        onClick={onClose}
                        className="border-2 border-gray-200 rounded-md px-4 font-bold">
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
