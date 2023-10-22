import React from 'react';
import HeaderLogo from '../../assets/images/header/header__logo.svg';
import classes from './header.module.scss';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../controller/store';
import arrowBottom from '../../assets/icons/arrowBottom.svg';
import { API_URL } from '../../Model/api/axios';
import { useState } from 'react';
import { useEffect } from 'react';
import PopupCreatePost from '../popups/PopupCreatePost/PopupCreatePost';
import classNames from 'classnames';
import HeaderBurger from './HeaderBurger/HeaderBurger';

const Header = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const { store } = useStore();
    const [burger, setBurger] = useState(false);
    return (
        <div className={classes.Header}>
            {burger ? <HeaderBurger /> : null}
            <div className="_container">
                <div className={classes.HeaderBlock}>
                    <img className={classes.HeaderAvatar} src="" alt="" />
                    <Link to="/" className={classes.HeaderLogo}>
                        <img src={HeaderLogo} alt="" />
                    </Link>
                    <ul className={classes.HeaderList}>
                        <Link to="/">Главная</Link>
                        <Link to="/categories">Категории</Link>
                        <Link to="/articles">Статьи</Link>
                        <li>Контакты</li>
                    </ul>
                    {store.isAuth ? (
                        <>
                            <div className={classes.headerUser}>
                                <div className={classes.headerUserImg}>
                                    <img
                                        src={`${API_URL}/images/${
                                            store.getUser()?.avatar
                                        }`}
                                        alt="Аватарка"
                                    />
                                </div>
                                <div className={classes.headerUserBody}>
                                    <div className={classes.headerUserName}>
                                        {store.getUser()?.username}
                                        <img src={arrowBottom} alt="" />
                                    </div>
                                </div>
                                <div className={classes.headerUserMenu}>
                                    <ul>
                                        <li
                                            onClick={() => {
                                                setOpenPopup(true);
                                                document.body.style.overflow =
                                                    'hidden';
                                            }}
                                        >
                                            Создать статью
                                        </li>
                                        <li onClick={() => store.Logout()}>
                                            Выйти
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={classes.Registration}>
                            <Link to="/signup" className={classes.HeaderLogin}>
                                Регистрация
                            </Link>
                            <Link to="/login" className={classes.HeaderLogin}>
                                Войти
                            </Link>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => setBurger(!burger)}
                        className={
                            burger
                                ? classNames(
                                      classes.headerBurger,
                                      classes.active
                                  )
                                : classes.headerBurger
                        }
                    >
                        <span></span>
                    </button>
                </div>
            </div>
            {openPopup && (
                <PopupCreatePost
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                />
            )}
        </div>
    );
};

export default observer(Header);
