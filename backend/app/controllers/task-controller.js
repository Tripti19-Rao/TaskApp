const Task = require('../models/task-model')
const { validationResult } = require('express-validator')
const taskCltr = {}

taskCltr.create = (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const { body } = req
        const t1 = new Task(body)
        t1.save()
            .then((task)=>{
                res.json(task)
            })
            .catch((err)=>{
                res.json(err)
            })
}

taskCltr.list = (req,res) =>{  
        Task.find()
            .then((tasks)=>{
                res.json(tasks)
            })
            .catch((err)=>{
                res.json(err)
            })
}

taskCltr.getone =(req,res) => {
        const id = req.params.id
        Task.findById(id)
            .then((task)=>{
                res.json(task)
            })
            .catch((err)=>{
                res.json(err)
            })
}

taskCltr.destroy = (req,res) => {
        const id=req.params.id
        Task.findByIdAndDelete(id)
            .then((task)=>{
                res.json(task)
            })
            .catch((err)=>{
                res.json(err)
            })
}

taskCltr.update = (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const id = req.params.id
        const { body } = req
        Task.findByIdAndUpdate(id , body , {new:true})
            .then((task)=>{
                res.json(task)
            })
            .catch((err)=>{
                res.json(err)
            })
}

module.exports = taskCltr