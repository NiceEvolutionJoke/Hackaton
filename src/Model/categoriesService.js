import api from './api/axios';

export default class categoriesService {
    static async getCategories() {
        return api.get('/categories');
    }
}
