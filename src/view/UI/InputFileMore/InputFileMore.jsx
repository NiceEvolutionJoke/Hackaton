import React from 'react';
import iconCamera from '../../../assets/icons/iconCamera.svg';
import classes from './InputFileMore.module.scss';

const InputFileMore = ({ id, value, setValue, fileForn, setFileForn }) => {
    const onImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const fileURLs = Array.from(event.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setValue(fileURLs);
            setFileForn(event.target.files);
        }
    };
    return (
        <div className={classes.items}>
            <div className={classes.input}>
                <input
                    type="file"
                    id={id}
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
                    onChange={onImageChange}
                    multiple={true}
                />
                <label htmlFor={id}>
                    <img src={iconCamera} alt="" />
                </label>
            </div>
            {value &&
                value.map((img) => {
                    return (
                        <div className={classes.image}>
                            <img src={img} alt="" />
                        </div>
                    );
                })}
        </div>
    );
};

export default InputFileMore;
