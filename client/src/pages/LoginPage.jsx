import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "../styles/Button";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { loginRequest } from "../redux/auth/authAction";
import ErrorAlert from "../styles/ErrorAlert";
const initialFormData = {
  email: "",
  password: "",
};

const Container = styled.div`
  height: 100vh;
  padding: 20px;
`;

const FormBox = styled.div`
  margin: 80px auto;
  background-color: white;
  width: 90vw;
  border-radius: 5px;
  box-shadow: md;
  padding: 20px;
  border: 2px solid #76ff03;

  @media (min-width: 768px) {
    width: 80vw;
  }

  @media (min-width: 1024px) {
    width: 40vw;
    padding: 40px;
  }
`;

const StyledH2 = styled.h2`
  text-decoration: underline;
  font-weight: 500;
  font-size: 1.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;

  @media (min-width: 768px) {
    padding: 50px;
  }

  @media (min-width: 1024px) {
    padding: 40px;
  }
`;

const StyledLabel = styled.label`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledInput = styled.input`
  border: 1px dotted gray;
  padding: 8px;
`;

const PasswordToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledText = styled.p`
  text-decoration: underline;
`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const { error, token } = useSelector((store) => store.authReducer);
  console.log(error, token);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(loginRequest(formData)).then(() => navigate("/"));
    } catch (err) {
      console.log(err);
    }
    setFormData(initialFormData);
  };

  return (
    <Container>
      <FormBox>
        <StyledH2>Login</StyledH2>
        {error != null && <ErrorAlert message={error} />}
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>
            <StyledText as="span">Email</StyledText>
            <StyledInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
            />
          </StyledLabel>

          <StyledLabel>
            <StyledText as="span">Password</StyledText>
            <StyledInput
              name="password"
              placeholder="Type Password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
            />
            <PasswordToggle onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </PasswordToggle>
          </StyledLabel>

          <PrimaryButton
            type="submit"
            variant="outline"
            size="lg"
            border="1px solid #7CB342"
            color="#76FF03"
            borderRadius="5px"
          >
            Login
          </PrimaryButton>

          <StyledText>
            Don't have an account? <Link to="/register">Register</Link>
          </StyledText>
        </StyledForm>
      </FormBox>
    </Container>
  );
};

export default Login;
