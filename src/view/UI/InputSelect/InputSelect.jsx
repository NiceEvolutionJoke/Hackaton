import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import categoriesService from '../../../Model/categoriesService';
import './InputSelect.scss';

const InputSelect = ({ newOptions, placeholder, isMulti, setValue }) => {
    return (
        <div className="inputSelect">
            <Select
                placeholder={placeholder}
                isMulti={isMulti}
                className="react-select-container"
                classNamePrefix="react-select"
                options={newOptions}
                onChange={setValue}
                /*     defaultValue={newOptions[0]} */
            />
        </div>
    );
};

export default InputSelect;
