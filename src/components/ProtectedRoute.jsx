import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const localUser = localStorage.getItem("token")
    if ( localUser) {
         return <Outlet/>
    }else {
        return <Navigate to="/Login"/>
    }

};

export default ProtectedRoute;