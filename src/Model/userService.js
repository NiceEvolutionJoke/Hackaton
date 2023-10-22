import api from "../api/axios";

export default class UserService {
    static async getUsers() {
        return api.get('/users');
    }

}