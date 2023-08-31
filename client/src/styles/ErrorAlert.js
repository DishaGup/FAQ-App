import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  background-color: #ff4d4f;
  color: white;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.p`
  margin: 0;
  font-size: 14px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;

const ErrorAlert = ({ message, onClose }) => {
  return (
    <ErrorContainer>
      <ErrorMessage>{message}</ErrorMessage>
      {onClose && <CloseButton onClick={onClose}>Close</CloseButton>}
    </ErrorContainer>
  );
};

export default ErrorAlert;
