import React, { useEffect, useState } from 'react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import postService from '../Model/postService';
import FirstScreen from '../view/FirstScreen/FirstScreen';
import Post from '../view/UI/Post/Post';
import classes from './main.module.scss';
import categoriesService from '../Model/categoriesService';

export const Сategories = () => {
    document.body.classList.remove('dark');
    document.body.classList.remove('blue');
    const [posts, setPosts] = useState([]);
    const getCategories2 = async () => {
        try {
            const response = await categoriesService.getCategories();
            console.log(response.data);
            setPosts(response.data);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        getCategories2();
    }, []);
    return (
        <>
            <div className="_container">
                <div className={classes.items}>
                    {posts?.categories?.length > 0 &&
                        posts.categories.map((post) => {
                            return <div key={post.id}>{post.name}</div>;
                        })}
                </div>
            </div>
        </>
    );
};
