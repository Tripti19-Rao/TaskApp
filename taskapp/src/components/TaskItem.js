import * as React from "react"
import axios from "axios"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { useState } from "react"

function TaskItem(props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = React.useState("in progress")
  const [priority, setPriority] = React.useState("low")

  const [open, setOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)

  const handleStatusChange = (event, newAlignment) => {
    setStatus(newAlignment)
  }

  const handlePriorityChange = (event, newAlignment) => {
    setPriority(newAlignment)
  }

  const handleViewkOpen = () => {
    const key = props.mykey
    console.log(key)
    axios
      .get(`http://localhost:3052/api/tasks/${key}`)
      .then((response) => {
        const result = response.data
        setTitle(result.title)
        setDescription(result.description)
        setStatus(result.status)
        setPriority(result.priority)
      })
      .catch((err) => {
        console.log(err.message)
      })
    setOpen1(true)
  }

  const handleEditkOpen = () => {
    const key = props.mykey
    axios
      .get(`http://localhost:3052/api/tasks/${key}`)
      .then((response) => {
        const result = response.data
        setTitle(result.title)
        setDescription(result.description)
        setStatus(result.status)
        setPriority(result.priority)
      })
      .catch((err) => {
        console.log(err.message)
      })
    setOpen(true)
  }

  const handleEdit = () => {
    const obj = {
      title: title,
      description: description,
      status: status,
      priority: priority,
    }
    const id = props.mykey
    axios.put(`http://localhost:3052/api/tasks/${id}`, obj)
      .then((response) => {
        const result = response.data
        props.handleEdit(result)

        
      })
      .catch((err) => {
        console.log(err.message)
      })
    handleClose()
  }

  const handleDelete = () => {
    const key = props.mykey
    axios.delete(`http://localhost:3052/api/tasks/${key}`).then((response) => {
      const result = response.data
      props.handleDelete(result)
    })
  }

  const handleClose1 = () => {
    setOpen1(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleViewkOpen}>
        Veiw
      </Button>
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Description: {description}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Status: {status}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Priority: {priority}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Close</Button>
        </DialogActions>
      </Dialog>

      <Button variant="outlined" onClick={handleEditkOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
        </DialogTitle>
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
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleEdit}>Edit</Button>
        </DialogActions>
      </Dialog>
      <Button variant="outlined" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  )
}
export default TaskItem
