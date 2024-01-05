const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 3052
const { Schema , model } = mongoose
const { checkSchema, validationResult } = require('express-validator') 
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/taskapp-assignment')
    .then(()=>{
        console.log("Connected to db")
    })
    .catch(()=>{
        console.log('Error connecting to db')
    })

const taskSchema = new Schema({
    title:String,
    description:String,
    status:String,
    priority:String
},{timestamps:true})

const Task = model("Task",taskSchema)

const taskValidationSchema = {
    title:{
        notEmpty:{
            errorMessage:'Title name is required'
        }
    },
    description:{
        notEmpty:{
            errorMessage:'Description is required'
        }
    },
    status:{
        notEmpty:{
            errorMessage:'Status is required'
        },
        isIn:{
            options:[['pending', 'in progress', 'completed']],
            errorMessage:'Status should be selected from the given list'
        }
        },
    priority:{
        notEmpty:{
            errorMessage:'Priority is required'
        },
        isIn:{
            options:[['low','medium','high']],
            errorMessage:'Priority should be selected within the given list'
    }
        }
}

app.post('/api/tasks',checkSchema(taskValidationSchema),(req,res)=>{
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
})

app.get('/api/tasks', (req,res)=>{
    Task.find()
        .then((tasks)=>{
            res.json(tasks)
        })
        .catch((err)=>{
            res.json(err)
        })
})

app.get('/api/tasks/:id',(req,res)=>{
    const id = req.params.id
    Task.findById(id)
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err)
        })
})


app.delete('/api/tasks/:id',(req,res)=>{
    const id=req.params.id
    Task.findByIdAndDelete(id)
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err)
        })
})

app.put('/api/tasks/:id',checkSchema(taskValidationSchema),(req,res)=>{
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
})





app.listen( port , ()=>{
    console.log('Server is running on port '+port)
})