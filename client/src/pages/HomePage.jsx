import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getAllQuestions } from '../redux/faq/faqAction';
import QuestionCard from '../components/QuestionCard';
import AddQuestionModal from '../components/AddQuestionModal';


const HomePageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
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
  const {questions} = useSelector((state) => state.faqReducer);
  const [isOpen, setIsOpen] = useState(false);
//console.log(questions)
  useEffect(() => {
    // Fetch list of questions on component mount
    dispatch(getAllQuestions());
  }, [dispatch]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <HomePageContainer>
      <h2>Questions</h2>
      {questions && questions.map((question) => (
        <QuestionCard key={question._id} question={question} />    
      ))}
      <AddQuestionButton onClick={openModal} >Add Question</AddQuestionButton>

      
        {isOpen && <AddQuestionModal isOpen={isOpen} onClose={closeModal} />}
 
      
    </HomePageContainer>
  );
};

export default HomePage;
