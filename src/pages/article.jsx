import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import postService from '../Model/postService';
import commentService from '../Model/commentService';
import store from '../controller/store';
import viewsService from '../Model/viewsService';
import classes from './article.module.scss';
import Footer from '../view/Footer/Footer';
import Share from '../../src/assets/icons/share.svg';
import Arrow from '../../src/assets/icons/iconArrow.svg';
import Copy from '../../src/assets/icons/iconCopy.svg';
import Qr from '../../src/assets/icons/iconQr.svg';
import Vk from '../../src/assets/icons/iconVk.svg';
import Tg from '../../src/assets/icons/iconTg.svg';
import subscribeService from '../Model/subscribeService';
import { API_URL } from '../Model/api/axios';

const Article = () => {
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const slug = useParams().slug;
    const navigate = useNavigate();

    const getPost = async (slug) => {
        try {
            const response = await postService.getPost(slug);
            setPost(response.data);
            console.log(response);
            await views(response.data.post.id);
        } catch (e) {
            console.error(e);
        }
    };
    const createComment = async (postId, text) => {
        try {
            const response = await commentService.createComment(postId, text);
            console.log(response);
            console.log(post);
        } catch (e) {
            console.error(e);
        } finally {
            location.reload();
        }
    };
    const theme = () => {
        if (post && post.post) {
            if (post.post.theme === 1) {
                document.body.classList.add('dark');
                return;
            } else if (post.post.theme === 2) {
                document.body.classList.add('blue');
                return;
            }
        }
    };
    const deleteComment = async (id) => {
        try {
            const response = await commentService.deleteComment(id);
            console.log(response);
        } catch (e) {
            console.error(e);
        } finally {
            location.reload();
        }
    };
    const views = async (postId) => {
        try {
            const response = await viewsService.views(postId);
            console.log(response);
        } catch (e) {
            console.error(e);
        } finally {
        }
    };
    useEffect(() => {
        getPost(slug);
    }, [slug]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
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
    const calcDate = () => {
        let date = new Date();
        let datePost = new Date(post.post.createdAt);
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

    const deletePost = async () => {
        try {
            await postService.deletePost(slug);
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    const subscribeAuthor = async () => {
        try {
            await subscribeService.toggleSubscriptions(post.post.user.id);
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        theme();
    }, [post]);
    return (
        <div>
            {post && post.post ? (
                <div className="_container">
                    <div
                        className={
                            post && post.post
                                ? post.post.theme === 1
                                    ? classes.black
                                    : post.post.theme === 2
                                    ? classes.blue
                                    : classes.normal
                                : ''
                        }
                    >
                        <div>
                            <div className={classes.articleBlock}>
                                <div className={classes.articleHeader}>
                                    <div className={classes.articleUser}>
                                        <div className={classes.articleAvatar}>
                                            <img
                                                src={`${API_URL}/images/${post.post.user.image.name}`}
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            className={classes.articleUserName}
                                        >
                                            <p>{post.post.user.username}</p>
                                            <span>
                                                {post.post.subscriptionsCount}{' '}
                                                {calcWord(
                                                    post.post
                                                        .subscriptionsCount,
                                                    'просмотр',
                                                    'просмотра',
                                                    'просмотров'
                                                )}
                                            </span>
                                        </div>
                                        <div
                                            className={classes.delete}
                                            onClick={() => deletePost()}
                                        >
                                            Удалить
                                        </div>
                                    </div>
                                    <div className={classes.articleSubscribe}>
                                        <button
                                            onClick={() => subscribeAuthor()}
                                        >
                                            Подписаться
                                        </button>
                                    </div>
                                </div>
                                <div className={classes.articleContent}>
                                    <div className={classes.articleTitle}>
                                        {post.post.title}
                                    </div>
                                    <div className={classes.articleViews}>
                                        {calcDate()}{' '}
                                        {post.post.subscriptionsCount}{' '}
                                        {calcWord(
                                            post.post.subscriptionsCount,
                                            'просмотр',
                                            'просмотра',
                                            'просмотров'
                                        )}
                                    </div>
                                    <div
                                        className={classes.articleMain}
                                        dangerouslySetInnerHTML={{
                                            __html: post.post.content,
                                        }}
                                    >
                                        {/*    <p>{post.post.content}</p>
                                        <img src="/" alt="" /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.articleLikes}>
                            <div className={classes.articleLeft}>
                                <div className={classes.articleLikesPoint}>
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.5803 17.9709L18.2446 1C19.7691 1 21.2311 1.596 22.3091 2.65689C23.3871 3.71778 23.9927 5.15665 23.9927 6.65698V14.1996H34.8377C35.3931 14.1934 35.9433 14.3062 36.4502 14.53C36.957 14.7539 37.4083 15.0835 37.7728 15.496C38.1373 15.9086 38.4063 16.3942 38.5612 16.9192C38.7161 17.4442 38.7531 17.9961 38.6698 18.5366L36.0256 35.5075C35.887 36.4068 35.4229 37.2265 34.7187 37.8156C34.0145 38.4047 33.1177 38.7234 32.1935 38.7132H10.5803M10.5803 17.9709V38.7132M10.5803 17.9709H4.83212C3.81578 17.9709 2.84107 18.3683 2.1224 19.0755C1.40374 19.7828 1 20.742 1 21.7422V34.9419C1 35.9421 1.40374 36.9013 2.1224 37.6086C2.84107 38.3158 3.81578 38.7132 4.83212 38.7132H10.5803"
                                            stroke="black"
                                            strokeWidth="0.942829"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>0</span>
                                </div>
                                <div className={classes.articleLikesPoint}>
                                    <svg
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M34.7993 16.6851C34.8058 19.174 34.2243 21.6291 33.1022 23.8506C31.7717 26.5127 29.7264 28.7518 27.1953 30.3171C24.6641 31.8824 21.7472 32.7121 18.7712 32.7132C16.2824 32.7197 13.8272 32.1382 11.6057 31.0161L0.857422 34.5989L4.44017 23.8506C3.31808 21.6291 2.73659 19.174 2.74308 16.6851C2.74423 13.7091 3.57392 10.7922 5.13922 8.26105C6.70452 5.72993 8.94361 3.68459 11.6057 2.35413C13.8272 1.23203 16.2824 0.650547 18.7712 0.657036H19.714C23.6444 0.873871 27.3567 2.53282 30.1401 5.31623C32.9235 8.09965 34.5824 11.8119 34.7993 15.7423V16.6851Z"
                                            stroke="black"
                                            strokeWidth="0.942829"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>0</span>
                                </div>
                            </div>
                            <div className={classes.articleRight}>
                                <img src={Share} alt="" />
                                <span>0</span>
                                <div className={classes.articleRightPopup}>
                                    <p>
                                        <img src={Copy} alt="" />
                                        <span>Скопировать</span>
                                    </p>
                                    <p>
                                        <img src={Qr} alt="" />
                                        <span>QR код</span>
                                    </p>
                                    <p>
                                        <img src={Vk} alt="" />
                                        <span>VK</span>
                                    </p>
                                    <p>
                                        <img src={Tg} alt="" />
                                        <span>Telegram</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.commentAdd}>
                            <textarea
                                placeholder="Написать комментарий"
                                name=""
                                id=""
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <div
                                className={classes.commentArrow}
                                onClick={() =>
                                    createComment(post.post.id, comment)
                                }
                            >
                                <img src={Arrow} alt="" />
                            </div>
                        </div>
                        <div className={classes.articleComments}>
                            {post.post.comments.length > 0 &&
                                post.post.comments.map((comment, index) => {
                                    {
                                        console.log(1);
                                    }
                                    return (
                                        <div
                                            key={index}
                                            className={classes.articleComment}
                                        >
                                            <div className={classes.commentTop}>
                                                <img src="" alt="" />
                                                <p>Валерий Глазунов</p>
                                                <span>21 ч назад</span>
                                            </div>
                                            <div
                                                className={classes.commentMain}
                                            >
                                                <p>{comment.text}</p>

                                                {store.getUser() &&
                                                    store.getUser().userId ===
                                                        comment.user.id && (
                                                        <div
                                                            onClick={() =>
                                                                deleteComment(
                                                                    comment.id
                                                                )
                                                            }
                                                        >
                                                            -----------x--------
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Article;
