import Select from 'react-select'
import './InputDropDown.scss'

const InputDropDown = ({ old_options, value, placeholder, onChange, onBlur, autoFocus=false, isMulti=false }) => {
    const options = [];
    old_options?.forEach(element => {
        options.push({
            value: element.id,
            label: element.name
        });
    });
    return (
        <div>
            <Select 
                unstyled classNamePrefix="react-select" className='InputDropDown' 
                value={value} 
                placeholder={placeholder} 
                onChange={selected => onChange(selected)} 
                onBlur={onBlur}
                options={options} 
                autoFocus={autoFocus}
                openMenuOnFocus={() => autoFocus}
                isMulti={isMulti}
            />
        </div>
    );
}

export default InputDropDown; 
