import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../controller/store';
import Input from '../../view/UI/Input/Input';
import Checkbox from '../../view/UI/checkbox/Checkbox';
import Button from '../../view/UI/button/Button';
import classes from './Login.module.scss';
import { observer } from 'mobx-react-lite';

const Login = () => {
    const { store } = useStore();

    const location = useLocation();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    console.log(store.isAuth);
    const from = location.state ? location.state.from.pathname : '/';

    return store.isAuth ? (
        <Navigate to={from} replace />
    ) : (
        <div className={classes.authentication}>
            <div className="_container">
                <div className={classes.authentication__form}>
                    <div className={classes.authentication__title}>Войти</div>
                    <div className={classes.authenticationBlock}>
                        <Input
                            value={login}
                            onChange={setLogin}
                            placeholder="Логин"
                            solid={true}
                        />
                        <Input
                            value={password}
                            onChange={setPassword}
                            placeholder="Ваш пароль"
                            solid={true}
                        />
                        <Checkbox />
                        <Button
                            text="Войти"
                            solid={true}
                            onClick={() => store.Login(login, password)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Login);
