import React from 'react';
import classes from './PatternPopup.module.scss';
import iconClose from '../../../assets/icons/iconClose.svg';

const PatternPopup = ({ children, setOpen, open }) => {
    return (
        <div
            className={classes.popup}
            onClick={() => {
                setOpen(false);
                document.body.style.overflow = 'auto';
            }}
        >
            <div
                className={classes.popupBlock}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={classes.popupClose}
                    onClick={() => {
                        setOpen(false);
                        document.body.style.overflow = 'auto';
                    }}
                >
                    <img src={iconClose} alt="close" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default PatternPopup;
