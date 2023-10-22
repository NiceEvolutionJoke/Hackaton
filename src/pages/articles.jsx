import React, { useEffect, useState } from 'react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import postService from '../Model/postService';
import FirstScreen from '../view/FirstScreen/FirstScreen';
import Post from '../view/UI/Post/Post';
import classes from './main.module.scss';

export const Articles = () => {
    document.body.classList.remove('dark');
    document.body.classList.remove('blue');
    const [posts, setPosts] = useState([]);
    const getPosts = async () => {
        try {
            const response = await postService.getPosts();
            console.log(response.data);
            setPosts(response.data);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        getPosts();
    }, []);
    return (
        <>
            <div className="_container">
                <div className={classes.items}>
                    {posts?.posts?.length > 0 &&
                        posts.posts.map((post) => {
                            return <Post post={post} key={post.id} />;
                        })}
                </div>
            </div>
        </>
    );
};
