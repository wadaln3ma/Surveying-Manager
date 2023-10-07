import TaskModel from '../models/task.model'
import PointModel from '../models/point.model'
import asyncHandler from 'express-async-handler'
import { Types } from 'mongoose'
import fs from 'fs'
import path from 'path'
import { UpsertTaskSchema } from '../schemas/TaskSchema'
import logger from '../utils/logger'

const ITEMS_PER_PAGE = 3

// Add a new Task
export const addTask = asyncHandler(async (req, res)=>{
  const result = await UpsertTaskSchema.validateAsync(req.body)

  const { name, description } = result

  const userId = req.userInfo.userId

  const task = await TaskModel.findOne({name})

  if(task){
    res.status(409)
    throw new Error('Task Allready Exists')
  }

  const newTask = await TaskModel.create({
    name, description, userId
  })

  if(!newTask){
    res.status(500)
    throw new Error('Couldn\'t create task')
  }

  res.status(201).json({
    newTask,
    message: 'Task Created Successfully',
    success: true
  })

})


// Get a single Task
export const getTask = asyncHandler(async (req, res)=>{
  const { id } = req.params

  if(!Types.ObjectId.isValid(id)){
    res.status(404)
    throw new Error('no such a task')
  }

  const task = await TaskModel.findById(id)


  if(!task){
    res.status(404)
    throw new Error('Task not Found')
  }


  res.status(200).json({
    task,
    message: 'Task fetched',
    success: true
  })
})

// Get Tasks paginate
export const getPaginatedTasks = asyncHandler(async (req, res)=>{
  const {term} = req.params

  const userId = req.userInfo.userId

  const { page } = req.query || 1
  const { items_per_page } = req.query || 3

  const query = term === 'none' ? {userId}
  : {
    userId,
    name: {
      '$regex': term,
      '$options': 'i'
    }
  }

  const countPromise = TaskModel.where(query).count()

  //const skip = (page - 1) * ITEMS_PER_PAGE
  const skip = (page - 1) * items_per_page
  const tasksPromise = TaskModel.find(query)
    .sort({'createdAt' : -1})
    .limit(items_per_page)
    .skip(skip)

  const [count, tasks] = await Promise.all([
    countPromise,
    tasksPromise
  ])


  if(!tasks){
    res.status(404)
    throw new Error('Tasks not found')
  }

  const pageCount = Math.ceil(count / items_per_page)

  res.status(200).json({
    tasks,
    pagination:{
      count,
      pageCount,
    },
    message: 'tasks fetched',
    success: true
  })

})

// Uodate a Task
export const updateTask = asyncHandler(async (req, res)=>{
  const { id } = req.params

  const result = await UpsertTaskSchema.validateAsync(req.body)

  if(!Types.ObjectId.isValid(id)){
    res.status(404)
    throw new Error("No such a Task")
  }

  const updatedTask = await TaskModel.findByIdAndUpdate(id, { ...result })

  if(!updatedTask){
    res.status(404)
    throw new Error('task not found')
  }

  res.status(200).json({
    updatedTask,
    message: "Task updated successfully",
    success: true
  })
})


//Delete a single Task
export const deleteTask = asyncHandler(async (req, res)=>{
  const { id } = req.params

  if(!Types.ObjectId.isValid(id)){
    res.status(404)
    throw new Error("No such a Task")
  }

  const task = await TaskModel.findById(id)

  if(!task){
    res.status(404)
    throw new Error("Task not found")
  }

  const deleted =  await TaskModel.findByIdAndDelete(id)

  if(!deleted){
    res.status(400)
    throw new Error("Error Something")
  }

  const dPoints = await PointModel.deleteMany({taskName: task.name})

  res.status(200).json({
    deleted,
    deletedPoints: dPoints,
    message: 'task deleted seccessfully',
    success: true
  })

})

//Download a Task of as csv file
export const downloadCsv = asyncHandler(async (req, res)=>{
  const { taskName } = req.params
  const userId = req.userInfo.userId
  const fileName = taskName.replace(/[/ \\]/, '-')

  const points = await PointModel.find({taskName})

  if(points.length === 0){
    res.status(404)
    throw new Error('Task is empty, No Points found')
    return
  }

  const directory = path.join(__dirname, '..', `/temp`)

  const file = `${directory}/${fileName}.csv`

  points.map((t, i) =>{
   const line = `${i+1},${t.name},${t.longitude},${t.latitude},${t.remarks}\r`

    fs.appendFileSync(`${file}`, line, err => {
      if(err){
        console.log(err)
        return
      }
    })

  })


    if(!file){
      res.status(404)
      throw new Error('file not found')
    }


fs.readdir(directory, (err, files)=>{
  if (err) throw err

  for(const file of files){
    res.download(path.join(directory, file), (err)=>{
      if(err) throw err
      fs.unlink(path.join(directory, file))
    })
  }
})

})

