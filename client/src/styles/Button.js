import styled from 'styled-components';

export const Button = styled.button`
  color: var(--white);
  font-family: var(--ff-poppins);
  padding: 20px 30px;
  border-radius: 15px;
  transition: var(--transition);
`;

export const SecondaryButton = styled(Button)`
  background: var(--rich-black-fogra-29);
  box-shadow: inset 0 -10px 20px hsl(240, 8%, 37%);

  &:hover, &:focus {
    background: var(--gambog);
    box-shadow: 5px 10px 30px hsla(39, 100%, 50%, 0.3);
  }
`;

export const PrimaryButton = styled(Button)`
  background: var(--orange-web);
  box-shadow: 5px 10px 30px hsla(39, 100%, 50%, 0.3);

  &:hover, &:focus {
    background: var(--gambog);
    transform: translateY(-3px);
  }
`;
