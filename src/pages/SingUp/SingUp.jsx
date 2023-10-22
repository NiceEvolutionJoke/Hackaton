import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../controller/store';
import Input from '../../view/UI/Input/Input';
import Checkbox from '../../view/UI/checkbox/Checkbox';
import Button from '../../view/UI/button/Button';
import classes from './SingUp.module.scss';
import InputFile from '../../view/UI/InputFile/InputFile';
import { observer } from 'mobx-react-lite';

const SingUp = () => {
    const { store } = useStore();

    const location = useLocation();
    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [file, setFile] = useState(null);
    const [fileForn, setFileForn] = useState();
    const from = location.state ? location.state.from.pathname : '/';
    console.log(store.isAuth);
    return store.isAuth ? (
        <Navigate to={from} replace />
    ) : (
        <div className={classes.authentication}>
            <div className="_container">
                <div className={classes.authentication__form}>
                    <div className={classes.authentication__title}>
                        Регистрация
                    </div>
                    <div className={classes.authenticationBlock}>
                        <Input
                            value={name}
                            onChange={setName}
                            placeholder="Имя"
                        />
                        <Input
                            value={login}
                            onChange={setLogin}
                            placeholder="Логин"
                        />
                        <Input
                            value={password}
                            onChange={setPassword}
                            placeholder="Ваш пароль"
                        />
                        <Input
                            value={passwordTwo}
                            onChange={setPasswordTwo}
                            placeholder="Повторите пароль"
                        />
                        <InputFile
                            id="fileInput"
                            value={file}
                            setValue={setFile}
                            fileForn={fileForn}
                            setFileForn={setFileForn}
                        />
                        <Checkbox />
                        <Button
                            text="Сохранить"
                            onClick={() =>
                                store.Signup(
                                    login,
                                    name,
                                    password,
                                    passwordTwo,
                                    fileForn
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(SingUp);
