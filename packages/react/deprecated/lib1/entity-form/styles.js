import styled from 'styled-components';

export default {
  Label: styled.div`
    ${props => props.theme?.ui?.entityForm?.label}
  `,

  Error: styled.header`
    ${props => props.theme?.ui?.entityForm?.error}
  `,

  Container: styled.div`
    ${props => props.theme?.ui?.entityForm?.container}
  `,
};
