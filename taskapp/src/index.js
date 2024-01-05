import React from "react"
import axios from "axios"
import ReactDOM from "react-dom/client"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import { useState, useEffect } from "react"
const root = ReactDOM.createRoot(document.getElementById("root"))

function App() {
  const [task, setTask] = useState([])
  const [ statusfilter , setStatusFilter ]= useState("null")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = React.useState("in progress")
  const [priority, setPriority] = React.useState("low")

  useEffect(() => {
    axios
      .get("http://localhost:3052/api/tasks")
      .then((response) => {
        console.log(response.data)
        const result = response.data
        setTask(result)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const addTask = (obj) => {
    axios
      .post("http://localhost:3052/api/tasks", obj)
      .then((response) => {
        const result = response.data
        setStatusFilter("null")
        setTask([...task, result])
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handleEdit = (id, obj) => {
    console.log(`index edit id is ${id}`)
    axios
      .put(`http://localhost:3052/api/tasks/${id}`, obj)
      .then((response) => {
        const result = response.data
        console.log(result.title)
        const newArr = task.map((ele) => {
          if (ele._id === result._id) {
            return result
          } else {
            return ele
          }
        })
        setTask(newArr)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3052/api/tasks/${id}`).then((response) => {
      const result = response.data
      const newArr = task.filter((ele) => {
        return ele._id !== result._id
      })
      setTask(newArr)
    })
  }

  return (
    <div>
      <TaskForm
        addTask={addTask}
        title={title}
        description={description}
        status={status}
        priority={priority}    
      />
      <TaskList
        task={task}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        statusfilter={statusfilter}
        setStatusFilter={setStatusFilter}
      />
    </div>
  )
}

root.render(<App />)
