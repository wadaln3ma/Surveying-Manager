import PointModel from '../models/point.model'
import asyncHandler from 'express-async-handler'
import { Types } from 'mongoose'
import { UpsertPointSchema } from '../schemas/PointSchema'

// Get a single point of a task
export const getPoint = asyncHandler(async(req, res)=>{
  const { id } = req.params

  if(!Types.ObjectId.isValid(id)){
    res.status(404)
    throw new Error("No such a Point")
  }

  const point = await PointModel.findById(id)

  if(!point){
    res.status(404)
    throw new Error("No such a point")
  }

  res.status(200).json({
    point,
    message: "point found",
    success: true
  })
})

//add a single point to the database
export const addPoint = asyncHandler(async(req, res)=>{

  const result = await UpsertPointSchema.validateAsync(req.body)

  const { name, longitude, latitude, remarks, taskName } = result

  const point = await PointModel.findOne({name, taskName})

  if(point && point.taskName === taskName){
    res.status(409)
    throw new Error('Point Allready in the database')
  }

  const newPoint = await PointModel.create({
    name, longitude, latitude, remarks, taskName
  })

  if(!newPoint){
    res.status(500)
    throw new Error('Couldn\'t add point')
  }

  res.status(201).json({
    newPoint,
    message: "Point added successfully",
    success: true
  })

})

//Get All points of a single task
export const getPoints =  asyncHandler(async (req, res)=>{
  const { taskName } = req.params

  const points = await PointModel.find({taskName}).sort({'createdAt': -1})

  if(!points){
    res.status(404)
    throw new Error('Point not found')
  }

  res.status(200).json({
    points,
    message: 'points fetched',
    success: true
  })
})

// Update a single point of a task
export const updatePoint = asyncHandler(async (req, res)=>{
  const { id } = req.params

  const result = await UpsertPointSchema.validateAsync(req.body)

  const { name, taskName } = result

  if(!Types.ObjectId.isValid(id)){
    res.status(404)
    throw new Error("No such a Point")
  }

  const point = await PointModel.findOne({name, taskName})

  if(point && point._id.toString() !== id){
    res.status(409)
    throw new Error("There is a point with the same name in this task")
  }

  const updatedPoint = await PointModel.findByIdAndUpdate(id, {...result})

  if(!updatedPoint){
    res.status(404)
    throw new Error("Couldn't update point, try agian")
  }

  res.status(200).json({
    updatedPoint,
    message: 'point updated successfully',
    success: true
  })
})

// Delete a single point from the database
export const deletePoint = asyncHandler(async (req, res)=>{
  const {id} = req.params

  if(!Types.ObjectId.isValid(id)){
    res.status(404)
    throw new Error("No such a Point")
  }

  const deleted = await PointModel.findByIdAndDelete(id)

  if(!deleted){
    res.status(404)
    throw new Error('Point not found')
  }

  res.status(200).json({
    message: 'Point deleted successfull',
    success: true
  })
})

// Delete All points of a task from the database
export const deleteAllTaskPoints = asyncHandler(async (req, res)=>{
  const { taskName } = req.params

  const deleted = await PointModel.deleteMany({taskName})

  if(!deleted){
    res.status(500)
    throw new Error('Server Error, Try Again')
  }

  res.status(200).json({
    message: 'Points deleted successfully',
    seccuss: true
  })
})

