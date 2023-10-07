import React from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { useTasksContext } from '../hooks/useTasksContext'
import { toast, Flip } from 'react-toastify'
import AddTaskModal from '../components/AddTaskModal'
import { MdSearch,
         MdOutlineDelete,
         MdDownload
} from 'react-icons/md'
import { confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'

const reducer = (page, action)=>{
    switch(action.type){
        case "ADD":
            console.log("Add")
            return page + 1
        case "DEC":
            return page - 1
        case "SELECT":
            return page + action.select
        case "HOME":
            return 1
        default:
            throw new Error()
    }
}

export default function Home(){
    const { tasks, dispatch } = useTasksContext()
    const [data, setData] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [pageCount, setPageCount] = React.useState(null)
    const [term, setTerm] = React.useState("")
    const [filterdData, setFilterdData] = React.useState(null)
    const [page, dispatchPage] = React.useReducer(reducer, 1)
    const toastRef = React.useRef(null)

    // Fetching Tasks
    const getTasks = async (page)=>{
            const res = await fetch(`/api/v1/tasks/${term? term: 'none'}?page=${page}`, {
                method: 'GET'
            })

            const json = await res.json()

            if(!res.ok){
                console.log('something went wrong')
            }
            
            if(res.ok){
                setData(json)
                console.log(json)
                setPageCount(json.pagination.pageCount)
            }

        }

    //Getting All the tasks on page render
    React.useEffect(()=>{

        getTasks(page)

    }, [page])

    // handle task deleting
    const deleteTask = async (id)=>{
        const toastId = toast.loading("Deleting Task...")
        setError(null)
        const res = await fetch(`/api/v1/tasks/${id}`, {
            method: 'DELETE',
        })

        if(!res.ok){
            setError(await res.json())
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
            setError(null)
            getTasks(page)
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

    //handle delete task button
    const handleDeleteTask = (e, id)=>{
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

    //handing pagination
    const handlePaginationClick = (e)=>{
        if(e.isNext){
            if(page === pageCount) return page
            dispatchPage({type: 'ADD'})
        }

        if(e.isPrevious){
            if(page === 1) return page
            dispatchPage({type : "DEC"})
        }
    }

    //Getting Search Data
    const fetchSearchData = async ()=>{
            const res = await fetch(`/api/v1/tasks/search/${term}?page=${page}`,
                {
                    method: 'GET'
                }
            )

            const json = await res.json()

            if(!res.ok){
                //setData(data)
                return
            }

            if(res.ok){
                setData(json)
                setPageCount(json.pagination.pageCount)
            }
        }

    // handle search button click
    const handleSearch = (e)=>{
        e.preventDefault()
        //fetchSearchData()
        dispatch({type: 'HOME'})
        getTasks()
    }

    return(
        <div className="w-full h-screen">
        <main className="relative">
        <div className="w-full pt-10 mx-auto text-center">
        <h1 className="text-white text-3xl md:text-4xl font-semibold">
        Rapid Surveying Manager
        </h1>
        </div>

        <div className="flex flex-col mt-10">

        <h3 
        className="text-center font-bold text-2xl p-2 my-3 md:text-3xl text-gray-500">
        My Tasks
        </h3>

        <div 
            className="flex w-full justify-between"
            >
        <form onSubmit={handleSearch}
            className="relative pl-4">
            <input type="text" 
                value={term}
                onChange={e => setTerm(e.target.value)}
                placeholder="find task"
                className="px-3 py-2 md:py-1 rounded-md bg-white text-sm font-semibild focus:outline-none"/>

        <MdSearch onClick={handleSearch}
            className="absolute right-2 top-3 md:top-2 text-gray-500 cursor-pointer"/>
        </form>

        <button onClick={e => setShowModal(true)}
            className="rounded-md bg-green-500 shadow-md shadow-green-500 text-white font-semibold cursor-pointer px-3 py-1 mr-4 hover:border-2 hover:bg-white hover:border-green-500 hover:text-green-500 hover:shadow-sm duration-5000"
            >
        Add Task
        </button>
        </div>


        <div
            className="mx-4 md:px-0">
        {data && data.tasks.map(task =><div key={task._id}
            className="flex w-full justify-between items-center rounded-md my-5 px-5 py-1 border-l-4 border-violet-500">
        <Link 
            to={`/task/${task.name}`}> 
            <p className="text-xl font-semibold text-gray-100">{task.name}</p>
            <p className="text-sm text-white pl-5">{task.description}</p>
        </Link>
            <div className="flex p-2 gap-2">
            <button className="bg-red-500 rounded-lg text-white flex items-center justify-center p-1"
            onClick={e => handleDeleteTask(e,task._id)}>
            <MdOutlineDelete 
                className=""/>
            </button>

            <a download 
               href={`/api/v1/tasks/download/${task.name}`}
            className="flex items-center justify-center gap-1 bg-green-500 rounded-md text-white px-2 py-1"
            >
            <MdDownload className="text-md"/> 
            <span className="text-sm font-semibold">CSV</span>
            </a>
            </div>

        </div>

        )}

        <div className="p-5">
        <ReactPaginate
        breakLabel=".."
        nextLabel=">"
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center gap-3"
        pageClassName="border-2 px-2 py-1 rounded-md font-bold text-sm text-white"
        nextClassName="border-2 px-2 py-1 rounded-md font-bold text-sm text-white"
        previousClassName="border-2 px-2 py-1 rounded-md font-bold text-sm text-white"
        activeClassName="bg-green-500"
        breakClassName="text-white text-lg"
        onClick={handlePaginationClick}
      />
        </div>


        </div>

        </div>

        {error ??  <div>
                {error}
            </div>}

            <Toast ref={toastRef}/>

        </main>
        <AddTaskModal open={showModal} onClose={(e) => setShowModal(false)} 
 text-center       reload={()=> getTasks()} />
        </div>
    )
}
