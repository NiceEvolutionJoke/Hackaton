import React, { useState } from 'react'
import { useLocation, Navigate } from "react-router-dom";
import { useStore } from '../../../controller/store';

import classes from './Login.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/button/Button';


const Login = () => {

    const { store } = useStore();

    const location = useLocation();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const from = location.state ? location.state.from.pathname : '/';

    return (
        store.isAuth 
            ?   <Navigate to={from} replace />
            :   <div className={classes.authentication}>
                    <div className={classes.authentication__form}>
                        <div className={classes.authentication__title}>
                            Войти в личный кабинет
                        </div>
                        <Input value={login} onChange={setLogin} placeholder='Логин' solid={true} />
                        <Input value={password} onChange={setPassword} placeholder='Ваш пароль' solid={true} />
                        <Button text='Войти' solid={true} onClick={() => store.Login(login, password)} />
                    </div>
                </div>
    )
}

export default Login