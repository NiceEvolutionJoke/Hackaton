import api from './api/axios';

export default class subscribeService {
    static async getLiked() {
        return api.get('/likes');
    }

    static async toggleLike(postId) {
        return api.post('/likes', { postId });
    }

    static async toggleSubscriptions(authorId) {
        return api.post('/subscriptions', { authorId });
    }
}
