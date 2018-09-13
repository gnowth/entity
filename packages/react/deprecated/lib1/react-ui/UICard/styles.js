import styled from 'styled-components';

export default {
  Root: styled.section`
    ${props => props.theme?.lib?.ui?.uiCard}
  `,

  Header: styled.header`
    ${props => props.theme?.lib?.ui['uiCard.header']}
  `,

  Content: styled.section`
    ${props => props.theme?.lib?.ui['uiCard.content']}
  `,

  Footer: styled.footer`
    ${props => props.theme?.lib?.ui['uiCard.footer']}
  `,
};
