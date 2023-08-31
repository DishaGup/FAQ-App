import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { PrimaryButton } from "../styles/Button";
import ErrorAlert from "../styles/ErrorAlert";
import { registerRequest } from "../redux/auth/authAction";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  role: "User",
  password: "",
  email: "",
};

const Container = styled.div`
  padding: 20px;
`;

const FormBox = styled.div`
  margin: auto;
  margin-top: 5%;
  width: 90vw;
  border-radius: 5px;
  box-shadow: md;
  background-color: white;
  border: 2px solid #76ff03;
  padding: 15px;

  @media (min-width: 768px) {
    width: 80vw;
    margin-top: 5%;
  }

  @media (min-width: 1024px) {
    width: 45vw;
    padding: 40px;
    margin-top: 3%;
  }
`;

const StyledH2 = styled.h2`
  font-weight: 500;
  font-size: 1.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 50px;

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
  border: 1px dotted #8bc34a;
  padding: 8px;
`;

const PasswordToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledButton = styled.button`
  width: 50%;
  margin: auto;
  margin-top: 30px;
  padding-top: 2px;

  &:hover {
    background-color: #7cb342;
    color: white;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const StyledText = styled.p`
  text-decoration: underline;
`;

const RegisterPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, token } = useSelector((store) => store.authReducer);
  console.log(error, token);
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
      dispatch(registerRequest(formData)).then(() => navigate("/"));
    } catch (err) {
      console.log(err);
    }
    setFormData(initialState);
  };

  return (
    <Container>
      <FormBox>
        <StyledH2>Register</StyledH2>
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
          <StyledLabel>
            <StyledText as="span">Role</StyledText>
            <StyledInput type="text" name="role" value={"User"} />
          </StyledLabel>
          <PrimaryButton
            type="submit"
            variant="outline"
            size="lg"
            border="1px solid #7CB342"
            color="#76FF03"
            borderRadius="5px"
          >
            Register
          </PrimaryButton>

          <StyledText>
            Already have an account? <Link to="/login">Login</Link>
          </StyledText>
        </StyledForm>
      </FormBox>
    </Container>
  );
};

export default RegisterPage;
