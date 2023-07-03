import { useState } from "react";
import './Filter.css'
const prioritybutton = ['low','high','medium','all']
const Filter =({filterPriority})=>{
    const [option,setOption] = useState('all')
    // console.log(option)
    return(
        <>
            <div className="newcard">
                
                <div className='badge-container-filter'>    
                    <p>FilterBy</p> {prioritybutton.map((p) =>( 
                    <div 
                        key={p}
                        className={`p-badge ${
                            (p===option && (option==='low' ? 'selected-low': option=='medium'? 'selected-medium':option==='high'? 'selected-high':option==='all'?'selected-all':''))
                        }`}
                        onClick={()=>{
                            setOption(p)
                            filterPriority(p)
                        }}
                    >{p}</div>))}
                </div>
                
            </div>
        </>
    );
}
export default Filter