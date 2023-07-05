import axios from "axios"
import { useState } from "react"
import {useNavigate,Link} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
const Signup = ()=>{
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const[email,setEmail] = useState("")
    const [repassword,setrePassword] = useState("")
    const[showpwd,setshowpwd] = useState(true)
    const[showpwd1,setshowpwd1] = useState("password")

    const Changepass = ()=>{
        setshowpwd(!showpwd)
        if(showpwd){
            setshowpwd1("text")
        }
        else{
            setshowpwd1("password")
        }
    }

    const navigate = useNavigate();
    const handleChangeName = (e)=>{
        setName(e.target.value);
    }
    const handleChangePassword = (e)=>{
        setPassword(e.target.value)
    }
    const handleChangerePassword = (e)=>{
        setrePassword(e.target.value)
    }
    const handleChangeEmail = (e)=>{
        setEmail(e.target.value)
    }
    const submit= (e)=>{
        e.preventDefault();
        try{
            if(password===repassword){
                axios.post('https://docket-fagy.onrender.com/api/v1/todo/signin',{
                    name,email,password
                }).then(response=>{
                    if(response.data.status === true){
                        navigate("/login")
                    }
                    else{
                        toast("Something worng in Your details")
                    }
                })
            }
            else{
                toast("Password should match")
            }
        }
        catch(err){
            console.log("Somthing",err)
        }
    }
    return(
        <>
        <form onSubmit={submit}>
            <ToastContainer/>
            <div className="container">
                <div className="sample">
                    <h2>Sign In</h2>
                <input id="name" type="text" placeholder="Enter Your Name" onChange={handleChangeName} required/><br />
                <br />
                <input id="name" type="email" placeholder="Enter Your Email" onChange={handleChangeEmail} required/>
                <br /><br />
                <input id="name" type={showpwd1} placeholder="Enter Your Password" onChange={handleChangePassword} required/>
                <br /><br />
                <input id="name" type={showpwd1} placeholder="Repeat password" onChange={handleChangerePassword} required/>
                <br /><br />
                <input type="checkbox" onClick={Changepass}/>Show Password<br /><br />
                <input className="btn" type="submit" />
                <br /><br />
                <h4>Do you hava an account? <Link to="/login" >Login</Link></h4>
                
                </div>
            </div>
        </form>
        <br />
        
        </>
    )
}
export default Signup