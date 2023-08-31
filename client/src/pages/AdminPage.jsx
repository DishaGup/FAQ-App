import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  approveAnswer,
  approveQuestion,
  approveUserRegistration,
  banUser,
  deleteQuestion,
  getAllUsers,
  getPendingAnswers,
  getPendingQuestions,
} from "../redux/admin/adminAction";
import { Link } from "react-router-dom";
const AdminDashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { pendingQuestions, pendingAnswers, users } = useSelector(
    (state) => state.adminReducer
  );

  useEffect(() => {
    dispatch(getPendingQuestions());
    dispatch(getPendingAnswers());
    dispatch(getAllUsers());
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

  const handleBanUser = (userId) => {
    dispatch(banUser(userId));
  };

  const handleChangeRole = (userID) => {
    dispatch(approveUserRegistration(userID));
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
          {pendingQuestions &&
            pendingQuestions.map((question) => (
              <tr key={question._id}>
                <Link to={`/faq/${question._id}`} target="_blank">
                  {" "}
                  <td>{question.content}</td>{" "}
                </Link>

                <td>
                  <button onClick={() => handleApproveQuestion(question._id)}>
                    Approve
                  </button>
                  <button onClick={() => handleDeleteQuestion(question._id)}>
                    Delete
                  </button>
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
          {pendingAnswers &&
            pendingAnswers.map((answer) => (
              <tr key={answer._id}>
                <td>{answer.content}</td>
                <td>
                  <button onClick={() => handleApproveAnswer(answer._id)}>
                    Approve
                  </button>
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
            <th>Banned</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.isBanned ? "Yes" : "No"}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleBanUser(user._id)}>Ban</button>
                </td>
                <td>
                  <button onClick={() => handleChangeRole(user._id)}>
                    Change role
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </AdminDashboardContainer>
  );
};

export default AdminDashboardPage;
