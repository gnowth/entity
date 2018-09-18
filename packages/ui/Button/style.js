import styled from 'styled-components';

export const Button = styled.button`
  display: none;

  ${props => props.theme}
  ${props => props.media`
    display: inline-block;
  `}
`;

export const ButtonResponsive = styled.button`
  display: inline-block;

  ${props => props.theme}
  ${props => props.media`
    display: none;
  `}
`;

export const HyperLink = Button.withComponent('a');

export const HyperLinkResponsive = ButtonResponsive.withComponent('a');
