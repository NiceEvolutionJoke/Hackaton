import { createContext, useContext } from 'react';
import { makeAutoObservable, toJS } from 'mobx';
import { API_URL } from '../Model/api/axios';
import AuthService from '../Model/authService';
import axios from 'axios';
import jwt from 'jwt-decode';

class Store {
    constructor() {
        makeAutoObservable(this);
    }
    /*---------------------------Theme -----------------------------*/
    theme = 'normal';
    setTheme(value) {
        this.theme = value;
    }
    /*---------------------------Errors Store-----------------------------*/

    error = '';
    errorCode = 0;
    isErrorActive = false;

    setError(response) {
        this.error = response?.data?.msg;
        this.errorCode = response?.status;
        this.isErrorActive = true;
    }

    closeError() {
        this.isErrorActive = false;
    }

    /*-----------------------------Auth Store-----------------------------*/
    isAuth = false;
    isLoading = false;
    role = 0;
    user = null;

    getUser() {
        return toJS(this.user);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setRole(role) {
        this.role = role;
    }

    async Login(login, password) {
        try {
            const response = await AuthService.login(login, password);
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setRole(response.data.role);
            this.user = jwt(response.data.accessToken);
            this.setAuth(true);
            window.location.reload();
        } catch (e) {
            console.error(e.response?.data?.msg);
        }
    }

    async Signup(login, name, password, password2, avatar) {
        try {
            const response = await AuthService.signup(
                login,
                name,
                password,
                password2,
                avatar
            );
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setRole(response.data.role);
            this.user = jwt(response.data.accessToken);
            this.setAuth(true);
            window.location.reload();
        } catch (e) {
            console.error(e.response?.data?.msg);
        }
    }

    async Logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('accessToken');
            this.setAuth(false);
            window.location.reload();
        } catch (e) {
            console.error(e.response?.data?.msg);
        }
    }

    async chechAuth() {
        this.setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/auth/refresh`, {
                withCredentials: true,
            });
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setRole(response.data.role);
            this.user = jwt(response.data.accessToken);
            this.setAuth(true);
        } catch (e) {
            console.error(e.response?.data?.msg);
        } finally {
            this.setLoading(false);
        }
    }
}

const store = new Store();

export const StoreContext = createContext({ store });

export const useStore = () => {
    return useContext(StoreContext);
};

export default store;
