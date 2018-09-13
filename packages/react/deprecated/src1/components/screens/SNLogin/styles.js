import styled from 'styled-components';
import background from 'assets/img/login-background.png';

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${background});
  background-size: cover;
`;

export default {
  Root,
};
