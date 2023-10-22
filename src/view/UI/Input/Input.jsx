import React from 'react';
import classes from './Input.module.scss';

const Input = ({ value, onChange, placeholder }) => {
    return (
        <div className={classes.popup__input}>
            <input
                type="text"
                value={value}
                autoComplete="true"
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required
            />
        </div>
    );
};

export default Input;
