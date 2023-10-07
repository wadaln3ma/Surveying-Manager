import React from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import TaskItem from '../components/TaskItem'
import { useTasksContext } from '../hooks/useTasksContext'
import { useFetchTasks } from '../hooks/useFetchTasks'
import { toast, Flip } from 'react-toastify'
import AddTaskModal from '../components/AddTaskModal'
import { MdSearch } from 'react-icons/md'
import { confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import Loading from '../components/Loading'
import { useAuth } from '../hooks/useAuth'

export default function Tasks(){
    const { user } = useAuth()
    const [showModal, setShowModal] = React.useState(false)
    const { tasks, count, pageCount } = useTasksContext()
    const { getTasks, loading, error } = useFetchTasks()
    const [term, setTerm] = React.useState("")
    const [itemsPerPage, setItemsPerPage] = React.useState(3)
    const [page, setPage] = React.useState(1)
    const toastRef = React.useRef(null)

       //Getting All the tasks on page render
    React.useEffect(()=>{
        getTasks(term,itemsPerPage, page)
    }, [page, user])

    //handing pagination
    const handlePaginationClick = (e)=>{
        if(e.isNext){
            if(page === pageCount) return page
            setPage(prev => prev + 1)
        }

        if(e.isPrevious){
            if(page === 1) return page
            setPage(prev => prev - 1)
        }
    }


        // handle search button click
    const handleSearch = (e)=>{
        e.preventDefault()
        dispatchPage({type: 'HOME'})
        getTasks(term,itemsPerPage, page)
    }

    if(loading){
        return <Loading />
    }

    return(
        <div className="w-full h-screen">
        <Link to="/dashboard">dash</Link>
        <main className="relative">
        <div className="w-full pt-10 mx-auto text-center">
        <h1 className="text-white text-3xl md:text-4xl font-semibold">
        Rapid Surveying Manager
        </h1>
        </div>

        <div className="flex flex-col mt-10">

        <h3 
        className="text-center font-bold text-2xl p-2 my-3 md:text-3xl text-gray-500 font-roboto font-semibold">
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
                className="px-3 py-2 md:py-2 rounded-md bg-white text-sm font-semibild focus:outline-none"/>

        <MdSearch onClick={handleSearch}
            className="absolute right-2 top-2 md:top-2 text-2xl text-gray-500 cursor-pointer"/>
        </form>

        <button onClick={e => setShowModal(true)}
            className="rounded-md bg-green-500 shadow-md shadow-green-500 text-white font-semibold cursor-pointer px-3 py-1 mr-4 hover:border-2 hover:bg-white hover:border-green-500 hover:text-green-500 hover:shadow-sm duration-5000"
            >
        Add Task
        </button>
        </div>


        <div
            className="mx-4 md:px-0">
        {tasks && tasks.map(task => <TaskItem id={task._id} name={task.name} description={task.description} toastRef={toastRef} key={task._id}/>)}

        <div className="p-5">
        <ReactPaginate
        breakLabel=".."
        nextLabel=">"
        pageRangeDisplayed={5}
        pageCount={Math.ceil(count/itemsPerPage)}
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

        {error &&  <div className="text-center text-red">
                {error}
            </div>}

        <Toast ref={toastRef}/>

        </main>
        <AddTaskModal open={showModal} onClose={(e) => setShowModal(false)} reload={()=> console.log('re')} />
        </div>
    )
}

