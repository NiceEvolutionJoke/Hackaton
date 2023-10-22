import api from './api/axios';

export default class likeService {
    static async getLiked() {
        return api.get('/likes');
    }

    static async toggleLike(postId) {
        console.log(postId);
        return api.post('/likes', { postId });
    }
}
