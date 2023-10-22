import { Outlet } from "react-router-dom";
import { useStore } from "../controller/store";

// import Header from './header/Header';
import Error from "./errors/Error";
// import PopUpsAED from "./PopUpsAED";


const Layout = () => {

    const {store} = useStore();

    return (
        <>
        {/* { store.isAuth ? <Header /> : null } */}
        <Error />
        <div className='main'>
            <Outlet />
        </div>
       {/*  { store.isAuth ? <PopUpsAED /> : null } */}
        </>
        
    )
}

export default Layout