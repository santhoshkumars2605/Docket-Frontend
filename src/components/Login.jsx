import axios from "axios"
import { useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import './login.css'
const Login = ()=>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const[showpwd,setshowpwd] = useState(true)
    const[showpwd1,setshowpwd1] = useState("password")
    
    const navigate = useNavigate()

    const handleChangeName = (e)=>{
        setName(e.target.value);
    }
    const handleChangePassword = (e)=>{
        setPassword(e.target.value)
    }
    const handleChangeEmail = (e)=>{
        setEmail(e.target.value)
    }
    const Changepass = ()=>{
        setshowpwd(!showpwd)
        if(showpwd){
            setshowpwd1("text")
        }
        else{
            setshowpwd1("password")
        }
    }
    const submit = (e)=>{
        e.preventDefault()
        try{
            axios.post('http://localhost:5000/api/v1/todo/login',{
                name,email,password
            }).then(response =>{
                if(response.data.status){
                    localStorage.setItem('email', email);
                    localStorage.setItem('name',name);
                    navigate('/')

                }
                else{
                    toast("There is no Account")
                }
            })
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <>
        <div>
            <ToastContainer/>
            <form onSubmit={submit}> 
            <div className="container">
                <div className="sample">
                <h2>Login</h2>
                <input id="name" className="form-control" type="text" placeholder="Enter Your Name" onChange={handleChangeName} required/><br /><br /> 
                <input className="form-control" id="name" type="email" placeholder="Enter Your Email" onChange={handleChangeEmail} required/><br /> <br />
                <input className="form-control" id="name" type={showpwd1} placeholder="Enter Your Password" onChange={handleChangePassword} required/><br /> <br />
                <input type="checkbox" onClick={Changepass}/>Show Password<br /><br />
                
                <input className="btn" type="submit"/><br /><br />
                <h4>New One? <Link to='/signup'>Register</Link></h4>
                </div>
            </div>
            </form>
            <br />

        </div>
        </>
    )
}
export default Login