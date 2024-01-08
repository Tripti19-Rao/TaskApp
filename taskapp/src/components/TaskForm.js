import * as React from "react"
import axios from 'axios'
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Divider from "@mui/material/Divider"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { useState } from "react"
import "./TaskForm.css"

function TaskForm(props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = React.useState("in progress")
  const [priority, setPriority] = React.useState("low")

  const handleSubmit = () => {
    const obj = {
      title: title,
      description: description,
      status: status,
      priority: priority,
    }
    axios.post("http://localhost:3052/api/tasks", obj)
      .then((response) => {
        const result = response.data
        props.addTask(result)
        handleClose()
        setTitle("")
        setDescription("")
        setStatus("in progress")
        setPriority("low")
      })
      .catch((err) => {
        console.log(err.message)
      })

    
  }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleStatusChange = (event, newAlignment) => {
    setStatus(newAlignment)
  }

  const handlePriorityChange = (event, newAlignment) => {
    setPriority(newAlignment)
  }

  return (
    <div>
      <h1>Task Management App</h1>
      <br />
      <Divider />
      <br />
      <h2>Add your tasks below!</h2>
      <React.Fragment>
        <div className="button">
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Task
          </Button>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add your task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
            <TextField
              margin="dense"
              id="name"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />
            <p>Set Status</p>
            <ToggleButtonGroup
              color="primary"
              value={status}
              exclusive
              onChange={handleStatusChange}
              aria-label="Platform"
              size="small"
            >
              <ToggleButton value="pending">Pending</ToggleButton>
              <ToggleButton value="in progress">In progress</ToggleButton>
              <ToggleButton value="completed">Completed</ToggleButton>
            </ToggleButtonGroup>
            <p>Set Priority</p>
            <ToggleButtonGroup
              color="primary"
              value={priority}
              exclusive
              onChange={handlePriorityChange}
              aria-label="Platform"
              size="small"
            >
              <ToggleButton value="low">Low</ToggleButton>
              <ToggleButton value="medium">Medium</ToggleButton>
              <ToggleButton value="high">High</ToggleButton>
            </ToggleButtonGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  )
}

export default TaskForm
