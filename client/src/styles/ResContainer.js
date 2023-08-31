import styled from 'styled-components';

const ResponsiveContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (max-width: 768px) {
    padding: 0 10px;
  }
`;



export default ResponsiveContainer;
