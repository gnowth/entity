import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled.button`
  display: inline-block;

  ${props => props.theme.components?.uiButton?.[props.variant]}
  ${props => props.css}
`;

export const LinkHyper = Button.withComponent('a');

export const LinkRouter = Button.withComponent(Link);
