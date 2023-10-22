import api from './api/axios';

export default class AuthService {
    static async login(login, password) {
        return api.post('/auth/login', { login, password });
    }

    static async signup(login, name, password, password2, avatar) {
        const formData = new FormData();
        formData.append('login', login);
        formData.append('name', name);
        formData.append('password', password);
        formData.append('password2', password2);
        formData.append('avatar', avatar);

        return api.post('/auth/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static async logout() {
        return api.post('/auth/logout');
    }
}
