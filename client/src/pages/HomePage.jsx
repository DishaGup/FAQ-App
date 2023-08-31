import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAllQuestions } from "../redux/faq/faqAction";
import QuestionCard from "../components/QuestionCard";
import AddQuestionModal from "../components/AddQuestionModal";

const HomePageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  margin-top:90px
`;

const EditIcon = styled.span`
  color: #007bff;
  cursor: pointer;
  margin-left: auto;
`;

const AddQuestionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 20px;
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { questions } = useSelector((state) => state.faqReducer);
  const [isOpen, setIsOpen] = useState(false);
  const [isAscending, setIsAscending] = useState(true); // New state for sorting

  //console.log(questions)
  useEffect(() => {
  
    setLoading(false);
    dispatch(getAllQuestions()).then(() => setLoading(false));
  }, [dispatch]);

  const openModal = () => {
    setIsOpen(true);
  };

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };
  const sortedQuestions = [...questions].sort((a, b) => {
    if (isAscending) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <HomePageContainer>
      <h2>Questions</h2>
      <button onClick={toggleSortOrder}>
        Question Order: {isAscending ? "Recent First" : "Old First"}
      </button>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        sortedQuestions &&
        sortedQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))
      )}

      <AddQuestionButton onClick={openModal}>Add Question</AddQuestionButton>

      {isOpen && <AddQuestionModal isOpen={isOpen} onClose={closeModal} />}
    </HomePageContainer>
  );
};

export default HomePage;
