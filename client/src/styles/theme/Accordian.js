import styled from "styled-components";

export const AccordionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--Secondary-color-dark);
    border-radius: 10px;
    height: auto;
    padding: 2%;
    text-align: center;
    transition: all 0.6s ease-in-out;
`;

export const InternalWrapper = styled.div`
    width: 100%;
    max-height: ${(props) => (props.open ? '100%' : '0')};
    transition: all 1s ease-in-out;
    overflow: hidden;
`;

const maxWidth = `900px`;

export const AccordionSection = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  transition: height 0.1s ease-in;
  height: 200px;
  ${(props) => {
    if (props.clicked !== false) {
      return `
      height: 200px;
      transition: height 0.1s ease-out;
      `;
    }
  }}
  @media (min-width: 768px) {
    height: 200px;
    ${(props) => {
      if (props.clicked !== false) {
        return `
        height: 200px;
        transition: height 0.1s ease-out;
        `;
      }
    }}
  }
`;

export const Container = styled.div`
  margin-top: 2rem;
  position: absolute;
  border-top: 1px solid rgb(175, 175, 175);
  overflow: hidden;
  width: 95%;
  padding:20px;
  @media (min-width: 992px) {
    width: ${maxWidth};
    max-width: ${maxWidth};
  }
`;

export const Wrap = styled.div`
  background: #ffffff;
  color: #000a33;
  border-bottom: 1px solid rgb(175, 175, 175);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  cursor: pointer;
  h1 {
    padding: 1.8rem;
    font-size: 1.2rem;
    color: #000a33;
    margin-bottom: 0;
  }
  span {
    margin-right: 1.5rem;
  }
`;

export const Dropdown = styled.div`
  background: #fff;
  color: #00ffb9;
  width: 100%;
  height: auto;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding: 0 3rem;
  border-bottom: 1px solid #aeaeb1;
  border-top: 1px solid #aeaeb1;
  p {
    font-size: 1.2rem;
    padding: 1rem 0;
  }
`;