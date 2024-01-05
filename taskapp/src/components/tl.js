import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';





function TaskList(){

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];      

return (
    <div>
      <br />
      <Divider>TASKS</Divider>
      <br />
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
)
}

export default TaskList






import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom/client'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { useState, useEffect } from "react";
const root = ReactDOM.createRoot(document.getElementById('root'))


function App(){

    const [ task , setTask ] = useState([])
    const [filtered , setFiltered] = useState([])
    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = React.useState('in progress');
  const [priority, setPriority] = React.useState('low');



  useEffect(() => {
    axios.get('http://localhost:3052/api/tasks')
      .then((response)=>{
        console.log(response.data)
        const result = response.data
        setTask(result)
        setFiltered(result)
      })
      .catch((err)=>{
        console.log(err.message)
      })
  },[])

  const addTask = (obj) =>{
    axios.post('http://localhost:3052/api/tasks',obj)
      .then((response)=>{
        const result = response.data
        
        
        setTask([...task , result ])
        setFiltered([...filtered,result])
        
      })
      .catch((err)=>{
        console.log(err.message)
      }) 
  }


  const handleEdit = (id , obj)=>{
    console.log(`index edit id is ${id}`)
    axios.put(`http://localhost:3052/api/tasks/${id}`,obj)
        .then((response)=>{
            const result = response.data
            console.log(result.title)
            const newArr = task.map((ele)=>{
                if(ele._id === result._id){
                    return result
                }
                else{
                    return ele
                }
            })
            
            setTask(newArr)
            setFiltered(newArr)
        })
        .catch((err)=>{
            console.log(err.message)
        })
  }


  const handleDelete = (id) =>{
    axios.delete(`http://localhost:3052/api/tasks/${id}`)
        .then((response)=>{
            const result = response.data
            const newArr = task.filter((ele)=>{
                return ele._id !==result._id
            })
            setTask(newArr)
            setFiltered(newArr)
        })
  }


  const handleFilter = (status) =>{
    if(status === "null"){
        setFiltered(task)
    }
    else{
        const newArr = task.filter((ele)=>{
            return ele.status === status
        })
        setFiltered(newArr)
    }

  }



    return (
        <div>
            <TaskForm addTask = {addTask} title={title} description={description} status={status} priority={priority}/>
            <TaskList task = {task}  handleDelete={handleDelete} handleEdit={handleEdit} handleFilter={handleFilter} filtered={filtered} />
            
            
        </div>
    )
}

root.render(<App />)

