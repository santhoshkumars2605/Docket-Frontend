import "./App.css";
import Newitem from "./components/New items/Newitems";
import Todolist from "./components/Todolist/Todolist";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Filter from "./components/Filter/Filter";
import { json } from "react-router-dom";
import Logout from "./components/Logout";
// const DEFAULT_LIST = [
//   {
//       title : 'Study js',
//       priority: 'high',
//       id :nanoid()
//   },
//   {
//       title : 'study css',
//       priority : 'low',
//       id:nanoid()
//   },
//   {
//       title : 'study React',
//       priority : 'medium',
//       id:nanoid()
//   }
// ]

const App = ()=> {
    const [list,setlist] = useState([])
   // const [emaillist,setemaillist] = useState([])   //change
    const [editstate,setEditstate] =useState({})
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');   //change
    useEffect(()=>{
      fetch('http://localhost:5000/api/v1/todo').then((res)=>{
        res.json().then((json)=>{
          //setemaillist(json) //change
          const filter = json.filter((i)=> i.email===email)//change
          setlist(filter)//change
          console.log(json)
          console.log(filter)
        })
      }).catch(()=>{
        console.log('NetWork Error')
      })
    },[email])
    // setlist(json)
    const deleteItem = (id)=>{
      console.log(id)
        const filterdlist = list.filter((item,i) => item._id!==id && item.email === email)  //change
        fetch(`http://localhost:5000/api/v1/todo/${id}`,{
          method:'DELETE'
        }).then(()=>{
          setlist([...filterdlist])
          toast("String Deleted successfully");
       })
    }
    const triggerEdit = (item)=>{
      setEditstate(item)
    }
    const editItem = (updateditem) =>{
      const id = updateditem._id
      console.log(updateditem)
        const updatedList = list.map((item)=>(item._id===updateditem._id && item.email===email ? updateditem : item))//change
        fetch(`http://localhost:5000/api/v1/todo/${id}`,{
          method:'PUT',
          headers:{
            'Accept': 'application/json ,text/plain ,*/*',
            'Content-Type':'application/json'
          },
          body: JSON.stringify(updateditem)
        }).then(()=>{
          setlist([...updatedList])
          toast("String Updated successfully");
       })
    }
    const addItem = (item) =>{
      // item.id = nanoid()
      // setlist((prev)=>[item,...prev])
      fetch('http://localhost:5000/api/v1/todo',{
        method:'POST',
        headers:{
          'Accept': 'application/json ,text/plain ,*/*',
          'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
      }).then((res)=>{
          res.json().then(json=>{
            setlist((prev)=> [json.data, ...prev])
          })
          //  setlist((prev)=> [item,...prev])
          //  toast("successfully added");
        })
    } 
    const filterPriority=(option)=>{
        // console.log(option+"hey")
        fetch ('http://localhost:5000/api/v1/todo/filter',{
            method:"POST",
            headers:{
              'Accept': 'application/json ,text/plain ,*/*',
              'Content-Type':'application/json'
                
            },
            body:JSON.stringify({
              priority:option
            })
          }).then((res)=>{
            res.json().then(json=>{
              const filtericon = json.filter((i)=> i.email===email)
              setlist(filtericon)
            })
          })
    }
    
    return(
      <div className="app">
        <ToastContainer />
        <h1 className="title">Docket</h1>
        
        <Newitem addItem={addItem} editstate={editstate} editItem={editItem}/>
        <Filter filterPriority = {filterPriority}/>
        <Todolist list = {list} deleteItem={deleteItem} triggerEdit = {triggerEdit}/>
        <Logout/>
      </div>
    )
}

export default App
