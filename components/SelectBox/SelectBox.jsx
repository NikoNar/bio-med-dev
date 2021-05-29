import React from 'react'
import Select from 'react-select'


const SelectBox = ({
                       options,
                       defaultValue,
                       styles,
                       inputId,
                       id,
                       components,
                       isSearchable,
                       value,
                       onChange
}) => {

    return(
        <Select
            options={options}
            defaultValue={defaultValue}
            styles={styles}
            id={id}
            inputId={inputId}
            components={components}
            isSearchable={isSearchable}
            value={value}
            onChange={onChange}
        />
        )
}

export default SelectBox