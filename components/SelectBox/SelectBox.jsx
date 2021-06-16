import React from 'react'
import Select from 'react-select'


const SelectBox = ({
                       options,
                       styles,
                       inputId,
                       id,
                       components,
                       isSearchable,
                       value,
                       onChange,
                       placeholder,
                       classname
}) => {

    const defaultValue = (options, value)=>{
        return options ? options.find(options=>options.value === value) : ''
    }


    return(
        <Select
            options={options}
            defaultValue={defaultValue(options, value)}
            styles={styles}
            id={id}
            inputId={inputId}
            components={components}
            isSearchable={isSearchable}
            value={value}
            onChange={value=>onChange(value)}
            placeholder={placeholder}
        />
        )
}

export default SelectBox