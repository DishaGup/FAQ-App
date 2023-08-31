import React, { useState } from "react";
import styled from "styled-components";
import { askQuestion } from "../redux/faq/faqAction";
import { useDispatch } from "react-redux";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const AddQuestionModal = ({ isOpen, onClose }) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(askQuestion(questionTitle, questionContent));
    onClose();
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Add New Question</h3>
            <form onSubmit={handleSubmit}>
              <label>Title:</label>
              <input
                type="text"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                required
              />
              <label>Content:</label>
              <textarea
                value={questionContent}
                onChange={(e) => setQuestionContent(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
            <button onClick={onClose}>Cancel</button>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default AddQuestionModal;
