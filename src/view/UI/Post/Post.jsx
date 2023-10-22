import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RepostsService from '../../../Model/RepostsService';
import { API_URL } from '../../../Model/api/axios';
import likeService from '../../../Model/likeService';
import comment from '../../../assets/icons/iconCommet.svg';
import share from '../../../assets/icons/share.svg';
import classes from './Post.module.scss';

const Post = ({ post }) => {
    const [likes, setLikes] = useState(post.likesCount);
    const [Islike, setIsLike] = useState(false);
    const toggleLike = async (id) => {
        try {
            const response = await likeService.toggleLike(id);
            console.log(response.data);
            if (response.data.liked === true) {
                setLikes(likes + 1);
                setIsLike(true);
            } else {
                setLikes(likes - 1);
                setIsLike(false);
            }
        } catch (e) {
            console.error(e);
        }
    };
    const RepostsService2 = async (posId) => {
        try {
            const response = await RepostsService.Reposts(posId);
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    };
    const calcDate = () => {
        let date = new Date();
        let datePost = new Date(post.createdAt);
        if (date.getDate() === datePost.getDate()) {
            if (datePost.getMinutes() < 10) {
                return `Сегодня в ${datePost.getHours()}:0${datePost.getMinutes()}`;
            } else {
                return `Сегодня в ${datePost.getHours()}:${datePost.getMinutes()}`;
            }
        } else if (date.getDate() === datePost.getDate() + 1) {
            return 'Вчера';
        } else {
            return 'Позавчера';
        }
    };
    const calcWord = (number, one, two, five) => {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }
        n %= 10;
        if (n === 1) {
            return one;
        }
        if (n >= 2 && n <= 4) {
            return two;
        }
        if (n === 0) {
            return five;
        }
        return five;
    };
    useEffect(() => {
        if (post.liked !== 0) {
            setIsLike(true);
        }
    }, []);
    return (
        <div className={classes.post}>
            <Link to={`/article/${post.slug}`} className={classes.postImg}>
                {post.images.length > 0 && (
                    <img
                        src={`${API_URL}/images/${post.images[0].name}`}
                        alt="Фотография поста"
                    />
                )}
            </Link>
            <div className={classes.postBody}>
                <div className={classes.postUser}>
                    {post.images.length > 0 && (
                        <img
                            src={`${API_URL}/images/${post.user.image.name}`}
                            alt=""
                        />
                    )}
                    <div className={classes.postUserBody}>
                        <div className={classes.postUserName}>
                            {post.user.username}
                        </div>
                        <div className={classes.postUserSubBody}>
                            <div className={classes.posyUserSubcribes}>
                                {post.viewsCount}{' '}
                                {calcWord(
                                    post.subscriptionsCount,
                                    'подписчик',
                                    'подписчика',
                                    'подписчиков'
                                )}
                            </div>
                            <div className={classes.postUserInfo}>
                                {calcDate()}
                                <p></p>
                                {post.viewsCount}{' '}
                                {calcWord(
                                    post.viewsCount,
                                    'просмотр',
                                    'просмотра',
                                    'просмотров'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/*   {new Date(post.createdAt).getDate()} */}
                <h3 className={classes.postTitle}>{post.title}</h3>
                <p className={classes.postText}>{post.subtitle}</p>
                <div className={classes.postBottom}>
                    <div className={classes.postBottomBody}>
                        <div
                            className={
                                Islike
                                    ? classNames(
                                          classes.postLikes,
                                          classes.active
                                      )
                                    : classes.postLikes
                            }
                            onClick={() => toggleLike(post.id)}
                        >
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.08062 10L10.1451 1C10.9536 1 11.729 1.31607 12.3006 1.87868C12.8723 2.44129 13.1935 3.20435 13.1935 4V8H18.9447C19.2393 7.99672 19.5311 8.0565 19.7999 8.17522C20.0687 8.29393 20.308 8.46873 20.5013 8.68751C20.6946 8.90629 20.8373 9.16382 20.9194 9.44225C21.0016 9.72068 21.0212 10.0134 20.977 10.3L19.5747 19.3C19.5012 19.7769 19.2551 20.2116 18.8816 20.524C18.5082 20.8364 18.0326 21.0055 17.5425 21H6.08062M6.08062 10V21M6.08062 10H3.03225C2.49326 10 1.97635 10.2107 1.59523 10.5858C1.21411 10.9609 1 11.4696 1 12V19C1 19.5304 1.21411 20.0391 1.59523 20.4142C1.97635 20.7893 2.49326 21 3.03225 21H6.08062"
                                    stroke="black"
                                    strokeWidth="0.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            {likes}
                        </div>
                        <div className={classes.postComments}>
                            <img src={comment} alt="" />
                            {post.commentsCount}
                        </div>
                    </div>
                    <div
                        className={classes.postShare}
                        onClick={() => RepostsService2(post.id)}
                    >
                        <img src={share} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
