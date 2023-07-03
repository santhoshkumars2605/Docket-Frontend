import { useState } from "react"
import Todolistitems from "./Todolistitems/Todolistitems"

const Todolist = (props)=>{
    const {list,deleteItem,triggerEdit} = props
    if(list.length <=0){
        return(
            <div>
                <center><h3>No items to Display</h3></center>
            </div>
        )
    }
    return(
        <>
            
            {list.map((item,index)=> <Todolistitems key={index} item = {item} onDelete={deleteItem}  index = {index} onEdit={triggerEdit}/>)}
        </>                                                         
    )
}
export default Todolist