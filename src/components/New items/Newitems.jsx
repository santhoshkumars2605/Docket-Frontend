import { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom'
const PRIORITY = ['low','medium','high']
import './Newitems.css'

const Newitem = (props)=>{
    // console.log(props)
    const {addItem , editstate,editItem} = props
    const[title,settitle] = useState('')
    const [priority,setPriority] = useState('low')
    const [isCompleted,setComplted] = useState(false)
    const[disname,setdisname] = useState("");
    const email = localStorage.getItem('email')   //change
    const name = localStorage.getItem('name');
    const navigate = useNavigate();
    const isEdit =Boolean(editstate._id) //true id id present 
    //useEffect(()=>{[,,,]})if any edit coocurs it will run
    useEffect(()=>{
        if(editstate._id){

            settitle(editstate.title)
            setPriority(editstate.priority)
            setComplted(editstate.isCompleted)
        }
    },[editstate])
    useEffect(()=>{
        if(name){
            setdisname("Hello "+name+" Type here")
        }
        else setdisname("Hello Type here")
    },[email])
    // console.log(priority)
    const handleinputchange = (e) =>{
        settitle(e.target.value)
        if(!email){
            navigate('/login')
        }
    }
    const handlesave = ()=>{
        if(!title) return // to avoid empty string
        const obj={
            title: title,
            priority:priority,
            isCompleted:isCompleted,
            email : email //change
        }
        if(isEdit){
            obj._id = editstate._id
            editItem(obj)
        }
        else{
            addItem(obj)
        }
        settitle('')
        setPriority('low')
    }
    const handleclear = ()=>{
        settitle('')
        setPriority('low')
        setComplted(false)
    }
    // console.log(title)

   
    return(
        <div className="new-item-card">
            
            {/* <div className="checkbox" />       */}
            <div className='form-container'>
                <input placeholder={disname} value={title} onChange={handleinputchange}/>
                {title && (<div>
                    <div className='badge-container'>
                        {PRIORITY.map((p) =>( 
                        <div 
                            key={p}
                            className={`p-badge ${
                                (p===priority && (priority==='low' ? 'selected-low': priority=='medium'? 'selected-medium':priority==='high'? 'selected-high':''))
                            }`}
                            onClick={()=>setPriority(p)}
                        >{p}</div>))}
                    </div>
                    <div className='btn-container'>
                        <button className='primary' onClick={handlesave}>Save</button>
                        <button onClick={handleclear}>Clear</button>
                    </div>
                </div>
                )}
            </div>  
        </div>
        
    )
}
export default Newitem