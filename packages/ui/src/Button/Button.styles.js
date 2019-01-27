import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { component } from '@gnowth/style';

export const Button = styled.button`
  display: inline-block;

  ${component({ name: 'uiButton' })}
  ${props => props.css}
`;

export const LinkHyper = Button.withComponent('a');

export const LinkRouter = Button.withComponent(Link);
