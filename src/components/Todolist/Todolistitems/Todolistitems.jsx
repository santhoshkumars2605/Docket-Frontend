import { useState } from 'react'
import './Todolistitems.css'

const Todolistitems = (props)=>{
    const {item ,onEdit,onDelete,index} = props
    const [isCompleted,setComplted] = useState(false)
    const {title, priority,_id} = item

    return(
        <>
            <div className={`item-card ${priority}`}>
                {isCompleted ?(
                    
                        <span className="material-symbols-outlined pointer" onClick={()=>setComplted(false)}>check_box</span>
                ):(
                    <span className='checkbox pointer' onClick={()=>setComplted(true)}/>
                )}
        
                <div className={`card-title ${isCompleted && 'strike'}`}>{title}</div>

                <div className='badge'>{priority}</div>
                <span className="material-symbols-outlined pointer edit-icon" onClick={()=> onEdit(item)}>edit</span>
                <span className="material-symbols-outlined pointer" onClick={()=> onDelete(_id)}>delete</span>
            </div>
        </>
    )
}
export default Todolistitems