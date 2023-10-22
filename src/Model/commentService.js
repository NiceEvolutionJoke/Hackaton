import api from './api/axios';

export default class commentService {
    static async createComment(postId, text) {
        console.log(postId, text);
        return api.post('/comments', { postId, text });
    }
    static async deleteComment(id) {
        return api.delete(`/comments/${id}`);
    }
}
