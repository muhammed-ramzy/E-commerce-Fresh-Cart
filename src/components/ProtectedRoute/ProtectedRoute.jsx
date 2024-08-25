import { useContext } from "react"
// import Style from "./ProtectedRoute.module.css"
import { userContext } from "../../Context/UserContext"
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {


    if(localStorage.getItem("userToken") !== null)
    {
        
        return props.children;
    }
    else
    {
        return <Navigate to={"/Login"}/>;
    }
}

export default ProtectedRoute
