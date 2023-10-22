import api from './api/axios';

export default class RepostsService {
    static async Reposts(postId) {
        return api.post('/reposts', { postId });
    }
}
