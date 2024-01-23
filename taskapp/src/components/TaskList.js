import * as React from "react"
import TaskItem from "./TaskItem"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import "./TaskList.css"

function TaskList(props) {

  //filter
  const handleFilter = (event) => {
    props.setStatusFilter(event.target.value)
  }

  return (
    <div>
      <br />
      <Divider className="customDivider">
        You have {props.task.length} tasks
      </Divider>
      <br />
      <div>
        <Box sx={{ minWidth: 100 }}>
          <FormControl className="customForm">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.statusfilter}
              label="status"
              onChange={handleFilter}
            >
              <MenuItem value="null">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in progress">In progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <TableContainer component={Paper}>
        <Divider></Divider>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  TITLE
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  STATUS
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  MORE OPTIONS
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.task.filter((ele) => {
                if (props.statusfilter === "null") {
                  return true
                } else {
                  return ele.status === props.statusfilter
                }
              }).map((task) => (
                <TableRow
                  key={task._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {task.title}
                  </TableCell>
                  <TableCell align="right">{task.status}</TableCell>
                  <TableCell align="right">
                    <TaskItem
                      mykey={task._id}
                      task={task}
                      handleDelete={props.handleDelete}
                      handleEdit={props.handleEdit}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TaskList
