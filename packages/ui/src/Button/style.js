import styled from 'styled-components';

export const Button = styled.button`
  display: inline-block;

  ${props => props.theme.components?.uiButton?.[props.variant]}
  ${props => props.css}
`;

export const ButtonResponsive = styled.button`
  display: none;

  ${props => props.theme.components ?.uiButton ?.[props.variant]}
  ${props => props.css}
`;

export const HyperLink = Button.withComponent('a');

export const HyperLinkResponsive = ButtonResponsive.withComponent('a');
