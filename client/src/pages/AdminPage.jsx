import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getAllPendingQuestions, approveQuestion, deleteQuestion, getAllPendingAnswers, approveAnswer, deleteAnswer, banUser } from '../redux/admin/adminActions';

const AdminDashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { pendingQuestions, pendingAnswers, users } = useSelector(state => state.adminReducer);

  useEffect(() => {
    dispatch(getAllPendingQuestions());
    dispatch(getAllPendingAnswers());
  }, [dispatch]);

  const handleApproveQuestion = (questionId) => {
    dispatch(approveQuestion(questionId));
  };

  const handleDeleteQuestion = (questionId) => {
    dispatch(deleteQuestion(questionId));
  };

  const handleApproveAnswer = (answerId) => {
    dispatch(approveAnswer(answerId));
  };

  const handleDeleteAnswer = (answerId) => {
    dispatch(deleteAnswer(answerId));
  };

  const handleBanUser = (userId) => {
    dispatch(banUser(userId));
  };

  return (
    <AdminDashboardContainer>
      <h2>Admin Dashboard</h2>
      {/* Pending Questions Table */}
      <h3>Pending Questions</h3>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingQuestions.map(question => (
            <tr key={question._id}>
              <td>{question.content}</td>
              <td>
                <button onClick={() => handleApproveQuestion(question._id)}>Approve</button>
                <button onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pending Answers Table */}
      <h3>Pending Answers</h3>
      <table>
        <thead>
          <tr>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingAnswers.map(answer => (
            <tr key={answer._id}>
              <td>{answer.content}</td>
              <td>
                <button onClick={() => handleApproveAnswer(answer._id)}>Approve</button>
                <button onClick={() => handleDeleteAnswer(answer._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Users Table */}
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleBanUser(user._id)}>Ban</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminDashboardContainer>
  );
};

export default AdminDashboardPage;
