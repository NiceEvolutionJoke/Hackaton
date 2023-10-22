import api from './api/axios';

export default class postService {
    static async getPosts() {
        return api.get('/posts');
    }
    static async getPost(slug) {
        return api.get(`/posts/${slug}`);
    }
    static async createPosts(
        title,
        subtitle,
        content,
        theme,
        categories,
        preview
    ) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('content', content);
        formData.append('theme', theme);
        for (let i = 0; i < categories.length; i++) {
            formData.append(`categories[]`, categories[i]);
        }
        for (let i = 0; i < preview.length; i++) {
            formData.append(`preview[]`, preview[i]);
        }

        return api.post('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static async updatePost(
        title,
        subtitle,
        content,
        theme,
        categories,
        preview,
        slug
    ) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('content', content);
        formData.append('theme', theme);
        formData.append('slug', slug);
        for (let i = 0; i < categories.length; i++) {
            formData.append(`categories[]`, categories[i]);
        }
        for (let i = 0; i < preview.length; i++) {
            formData.append(`preview[]`, preview[i]);
        }

        return api.patch('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static async deletePost(slug) {
        return api.delete(`/posts/${slug}`);
    }
}
