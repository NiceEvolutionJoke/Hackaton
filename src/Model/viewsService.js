import api from './api/axios';

export default class viewsService {
    static async views(postId) {
        return api.post('/views', { postId });
    }
}
