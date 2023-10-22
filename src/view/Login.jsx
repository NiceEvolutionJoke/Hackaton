import React, { useContext, useState } from 'react';
import { Context } from '../context.js';


const Login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);

    return (
        <>
            <input 
                onChange={e => setLogin(e.target.value)}
                value={login}
                type="text" 
                placeholder='Login'
            />
            <input 
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="text" 
                placeholder='Login'
            />
            <button onClick={() => store.Login(login, password)}>Войти</button>
        </>
    )
}

export default Login