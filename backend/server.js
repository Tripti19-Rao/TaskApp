const express = require('express')
const cors = require('cors')
const app = express()
const port = 3052
const { checkSchema } = require('express-validator') 
app.use(express.json())
app.use(cors())
const configureDB = require('./config/db')
const taskValidationSchema = require('./app/validations/task-validation')
configureDB()
const taskCltr = require('./app/controllers/task-controller')


app.post('/api/tasks', checkSchema(taskValidationSchema), taskCltr.create)
app.get('/api/tasks',  taskCltr.list)
app.get('/api/tasks/:id', taskCltr.getone)
app.delete('/api/tasks/:id',taskCltr.destroy)
app.put('/api/tasks/:id', checkSchema(taskValidationSchema), taskCltr.update)

app.listen( port , ()=>{
    console.log('Server is running on port '+port)
})