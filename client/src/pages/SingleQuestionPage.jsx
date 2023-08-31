import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  answerQuestion,
  getSingleQuestion,
  rateAnswer,
} from "../redux/faq/faqAction";
import { useParams } from "react-router-dom";

const SingleQuestionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const QuestionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const AnswerContainer = styled.div`
  margin-top: 20px;
`;

const AnswerItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const AnswerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AnswerRating = styled.span`
  font-weight: bold;
  color: #007bff;
`;

const AnswerTime = styled.span`
  font-size: 12px;
  color: #666;
`;

const AnswerUsername = styled.span`
  font-size: 14px;
  color: #333;
`;

const AnswerContent = styled.p`
  margin-top: 5px;
`;
const AddAnswerModalOverlay = styled.div`
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

const AddAnswerModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const RateAnswerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const RateAnswerLabel = styled.label`
  margin-right: 10px;
`;

const SingleQuestionPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { question } = useSelector((state) => state.faqReducer);
  console.log(question);
  const { questionId } = useParams();
  const [showAddAnswerModal, setShowAddAnswerModal] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState("");
  const [rating, setRating] = useState(1);
  useEffect(() => {
    // Fetch the details of a single question along with its answers on component mount
    setLoading(true);
    dispatch(getSingleQuestion(questionId)).then(() => setLoading(false));
   
  }, [questionId]);
  const handleAddAnswer = (content) => {
    console.log(content);
    dispatch(answerQuestion(questionId, content));
    setShowAddAnswerModal(false);
  };

  const handleRateAnswer = () => {
    dispatch(rateAnswer(selectedAnswerId, questionId));
    setRating(1);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <SingleQuestionContainer>
      <QuestionTitle>{question.title}</QuestionTitle>
      <h2>Q- {question.content}?</h2>
      <AnswerTime>
        Posted on: {new Date(question.createdAt).toLocaleString()}
      </AnswerTime>
      <AnswerContainer>
        {question &&
          question?.answers.map((answer, index) => (
            <AnswerItem key={answer._id}>
              <AnswerHeader>
                <AnswerRating>Rating: {answer.rating}</AnswerRating>
                <AnswerTime>
                  Posted on: {new Date(answer.createdAt).toLocaleString()}
                </AnswerTime>
              </AnswerHeader>
              <button onClick={() => handleRateAnswer(answer._id)}>Like</button>
              <AnswerContent>
                {index + 1}- {answer.content}
              </AnswerContent>
              <button onClick={() => setShowAddAnswerModal(true)}>
                Add answer
              </button>
            </AnswerItem>
          ))}
      </AnswerContainer>
      {showAddAnswerModal && (
        <AddAnswerModalOverlay>
          <AddAnswerModalContent>
            <h3>Add New Answer</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddAnswer(e.target.content.value);
              }}
            >
              <label>Content:</label>
              <textarea name="content" required />
              <button type="submit">Submit</button>
            </form>
            <button onClick={() => setShowAddAnswerModal(false)}>Cancel</button>
          </AddAnswerModalContent>
        </AddAnswerModalOverlay>
      )}
    </SingleQuestionContainer>
  );
};

export default SingleQuestionPage;
