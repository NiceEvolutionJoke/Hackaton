import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Input from '../../UI/Input/Input';
import Button from '../../UI/button/Button';
import PatternPopup from '../PatternPopup/PatternPopup';
import classes from './PopupCreatePost.module.scss';
import InputSelect from '../../UI/InputSelect/InputSelect';
import InputFileMore from '../../UI/InputFileMore/InputFileMore';
import { useRef } from 'react';
import postService from '../../../Model/postService';
import { useEffect } from 'react';
import categoriesService from '../../../Model/categoriesService';
import { API_URL } from '../../../Model/api/axios';
import store from '../../../controller/store';
import { Link } from 'react-router-dom';

const PopupCreatePost = ({ openPopup, setOpenPopup }) => {
    const [postContent, setPostContent] = useState(null);
    const [title, setTitle] = useState(null);
    const [subtitle, setSubtitle] = useState(null);
    const [file, setFile] = useState(null);
    const [fileForn, setFileForn] = useState();
    const [newOptions, setNewOptions] = useState([]);
    const [optionsLoading, setOptionsLoading] = useState(true);
    const [activeTheme, setActiveTheme] = useState(null);
    const [activeCategories, setActiveCategories] = useState(null);
    const [postCreated, setPostCreated] = useState(false);
    const [slug, setSlug] = useState(null);
    const createPosts = async (
        title,
        subtitle,
        content,
        theme,
        categories,
        preview
    ) => {
        try {
            const response = await postService.createPosts(
                title,
                subtitle,
                content,
                theme,
                categories,
                preview
            );
            console.log(response);
            setSlug(response.data.slug);
            setPostCreated(true);
        } catch (e) {
            console.error(e);
        } finally {
        }
    };

    const handleButtonClick = async () => {
        console.log(file);
        /*     console.log(content); */

        await createPosts(
            title,
            subtitle,
            postContent,
            activeTheme.value,
            activeCategories.map((el) => el.value),
            fileForn
        );
    };
    const handleChange = (content) => {
        console.log(content);
        setPostContent(content);
    };
    const prevText = useRef(null);

    const getOptions = async () => {
        try {
            const response = await categoriesService.getCategories();
            console.log(response);
            setNewOptions(
                response.data.categories.map((category) => {
                    return { value: category.id, label: category.name };
                })
            );
        } catch (e) {
            console.error(e);
        } finally {
            setOptionsLoading(false);
        }
    };
    const theme = [
        { value: 0, label: 'Светлая' },
        { value: 1, label: 'Темная' },
        { value: 2, label: 'Синяя' },
    ];
    useEffect(() => {
        getOptions();
    }, []);

    return (
        <>
            <PatternPopup setOpen={setOpenPopup} open={openPopup}>
                {postCreated ? (
                    <div className={classes.qrcode}>
                        <QRCode
                            value={`https://nice-evolution-joke.ru/article/${slug}`}
                        />
                        <Link
                            to={`article/${slug}`}
                            onClick={() => setOpenPopup(false)}
                        >
                            Перейти на созданную статью
                        </Link>
                    </div>
                ) : (
                    <>
                        <h2 className={classes.title}>Создание статьи</h2>
                        <div className={classes.inputs}>
                            {
                                /* newOptions.length > 0 && */ !optionsLoading && (
                                    <InputSelect
                                        newOptions={newOptions}
                                        placeholder="Выберите категорию"
                                        isMulti={true}
                                        setValue={setActiveCategories}
                                    />
                                )
                            }
                            <InputSelect
                                newOptions={theme}
                                placeholder="Выберите тему"
                                isMulti={false}
                                setValue={setActiveTheme}
                            />
                        </div>
                        <Input
                            value={title}
                            onChange={setTitle}
                            placeholder="Заголовок статьи"
                        />
                        <Input
                            value={subtitle}
                            onChange={setSubtitle}
                            placeholder="Подзаголовок статьи"
                        />
                        <InputFileMore
                            id="postFile"
                            value={file}
                            setValue={setFile}
                            fileForn={fileForn}
                            setFileForn={setFileForn}
                        />
                        <SunEditor
                            lang={'ru'}
                            /*  wysiwygFrame={prevText} */
                            width="100%"
                            height="800px"
                            onChange={handleChange}
                            setDefaultStyle="font-family: Inter; font-size: 18px;"
                            setOptions={{
                                resizingBar: false,
                                buttonList: [
                                    ['undo', 'redo'],
                                    ['font', 'fontSize', 'formatBlock'],
                                    ['paragraphStyle', 'blockquote'],
                                    [
                                        'bold',
                                        'underline',
                                        'italic',
                                        'strike',
                                        'subscript',
                                        'superscript',
                                    ],
                                    ['fontColor', 'hiliteColor', 'textStyle'],
                                    ['removeFormat'],
                                    ['outdent', 'indent'],
                                    [
                                        'align',
                                        'horizontalRule',
                                        'list',
                                        'lineHeight',
                                    ],
                                    [
                                        'table',
                                        'link',
                                        'image',
                                        'video',
                                        'audio',
                                    ],
                                    ['fullScreen', 'showBlocks', 'codeView'],
                                    ['preview', 'print'],
                                    ['save'],
                                ],
                                font: [
                                    'Arial',
                                    'Comic Sans MS',
                                    'Courier New',
                                    'Impact',
                                    'Georgia',
                                    'tahoma',
                                    'Trebuchet MS',
                                    'Verdana',
                                ],
                            }}
                        />
                        <div className={classes.buttons}>
                            <Button
                                onClick={handleButtonClick}
                                text="Отменить"
                            ></Button>
                            <Button
                                onClick={handleButtonClick}
                                text="Отправить"
                            ></Button>
                        </div>
                    </>
                )}
            </PatternPopup>
        </>
    );
};

export default PopupCreatePost;
