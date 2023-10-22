import React from 'react';
import { Routes, Route, Redirect, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../Routes';
/* import Loading from '../loading/loading'; */
/* import { useStore } from '../data/store'; */
import { observer } from 'mobx-react-lite';

const AppRouter = () => {
    const isAuth = false;
    /*     const { store } = useStore(); */
    return (
        <>
            {/*  {store.isLoading && <Loading />} */}
            <Routes>
                {isAuth &&
                    authRoutes.map(({ path, Component }) => {
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={<Component />}
                                exact
                            />
                        );
                    })}
                {publicRoutes.map(({ path, Component }) => {
                    return (
                        <Route
                            key={path}
                            path={path}
                            element={<Component />}
                            exact
                        />
                    );
                })}
            </Routes>
        </>
    );
};

export default observer(AppRouter);
