import React from 'react';
import iconCamera from '../../../assets/icons/iconCamera.svg';
import classes from './InputFile.module.scss';

const InputFile = ({ id, value, setValue, fileForn, setFileForn }) => {
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setValue(URL.createObjectURL(event.target.files[0]));
            setFileForn(event.target.files[0]);
        }
    };
    return (
        <div className={classes.input}>
            <input
                type="file"
                id={id}
                accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
                onChange={onImageChange}
            />
            <label htmlFor={id}>
                <img src={iconCamera} alt="" />
            </label>
        </div>
    );
};

export default InputFile;
