import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useStore } from "../controller/store";


const RequireAuth = () => {

    const location = useLocation();
    const {store} = useStore();


    return (
        store.isAuth
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth