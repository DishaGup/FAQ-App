import React, { useState } from "react";
import styled from "styled-components";
import {  AiOutlineMinusCircle } from "react-icons/ai";
import theme from "../styles/theme/theme";
import { AccordionSection, AccordionWrapper, Container, Dropdown, InternalWrapper, Wrap } from "../styles/theme/Accordian";
import { FcPlus } from "react-icons/fc";
import {Link} from 'react-router-dom'
const CardWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  position: relative;
  height: 1.5cm;
`;

const Question = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const AnswersWrapper = styled.div`
  margin-top: 10px;
`;

const Answer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;

const Subject = styled.p`
  position: absolute;
  top: 0px;
  left: 5px;
  color: ${(props) => props.theme.colors.mangoTango};

  ::after {
    content: "#";
  }
`;

const AnswerContent = styled.p`
  flex-grow: 1;
`;

const AnswerRating = styled.span`
  margin-left: 10px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
const Flex = styled.div`
  display: flex;
  justify: space-between;
  width: 90%;
`;

const Icon =styled.button`
width:49px;
height:49px;
background :0 0
`
const QuestionCard = ({ question }) => {
    const [clicked, setClicked] = useState(false);

    const toggle = (index) => {
      if (clicked === index) {
        //if clicked question is already active, then close it
        return setClicked(false);
      }
  
      setClicked(index);
    };
  
  return (

    <AccordionSection clicked={clicked}>
    <Container>
    <Wrap onClick={() => toggle(question._id)} key={question._id}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "flex-start",
          }}
        >
          <Subject>{question.title}</Subject>
        <Link to={`/faq/${question._id}`}  target="_blank">   <Question>{question.content}</Question> </Link>
        </div>
        {clicked === question._id ? (
                    <AiOutlineMinusCircle />
                  ) : (
                    <FcPlus  />
                  )}
    </Wrap>
    {clicked === question._id ? (
                
                  <Dropdown>
        <AnswersWrapper>
          {question.answers.map((answer) => (
            <Answer key={answer._id}>
              <AnswerContent>{answer.content}</AnswerContent>
              <AnswerRating>Rating: {answer.rating}</AnswerRating>
            </Answer>
          ))}
        </AnswersWrapper>
        </Dropdown>
               
              ) : null}
           
      </Container>
    </AccordionSection>
  );
};

export default QuestionCard;
