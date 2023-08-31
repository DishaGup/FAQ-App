import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-weight: 500;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--silver-chalice);
  border-radius: 5px;
`;


const FormInput = ({ label, ...rest }) => {
  return (
    <InputWrapper>
      <InputLabel>{label}</InputLabel>
      <InputField {...rest} />
    </InputWrapper>
  );
};




export default FormInput;
