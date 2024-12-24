import React from 'react';
import {styled} from 'styled-components';


const Input = styled.input``;

export const SearchInput = ({value, setValue}) => {
  const onInputChange = (event) => {
    if (setValue) { 
      setValue(event.target.value);
    }
  }

  return <Input value={value} onChange={onInputChange} placeholder='Поиск' />
}