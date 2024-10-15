import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { Authentication } from "../../context/AuthenticationContext/AuthenticationContextProvider";

export default function ProtectedRoute({children}) {

    let {isLogin} = useContext(Authentication);

    

    if(isLogin){
        return (
            <>
                {children}
            </>
        )
    }
    else{
        return(
            <>
                <Navigate to={'/'}></Navigate>
            </>
        )
    }
    

}
