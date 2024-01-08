import React from "react"
import axios from "axios"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import { useState, useEffect } from "react"

function App() {
  const [task, setTask] = useState([])
  const [statusfilter, setStatusFilter] = useState("null")

  useEffect(() => {
    axios
      .get("http://localhost:3052/api/tasks")
      .then((response) => {
        const result = response.data
        setTask(result)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const addTask = (addtask) => {
    setStatusFilter("null")
    setTask([...task, addtask])
  }

  const handleEdit = (result) => {
    const newArr = task.map((ele) => {
      if (ele._id === result._id) {
        return result
      } else {
        return ele
      }
    })
    setTask(newArr)
  }

  const handleDelete = (result) => {
    const newArr = task.filter((ele) => {
      return ele._id !== result._id
    })
    setTask(newArr)
  }

  return (
    <div>
      <TaskForm addTask={addTask} />
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

export default App
