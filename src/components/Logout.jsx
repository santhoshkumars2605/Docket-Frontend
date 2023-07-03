import { useNavigate } from "react-router-dom";

const Logout=()=>{
    const navigate = useNavigate();
    const change=()=>{
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        navigate('/login')
    }
    return(
        <>
        <div className="logout">
            <button className="btn1" onClick={change}>LogOut</button>
        </div>
        </>
    )
}
export default Logout