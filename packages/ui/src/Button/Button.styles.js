import styled, { css } from 'styled-components';
import { color } from '@gnowth/style';

export default styled.button`
  align-self: center;
  background-color: transparent;
  border: 0;
  border-radius: 0.25em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  outline: none;
  padding: 0.5em 1.5em;
  position: relative;
  text-decoration: none;

  &:hover {
    background-color: ${color({ name: 'gray', weight: '50' })};
  }

  &:focus {
    background-color: ${color({ name: 'gray', weight: '100' })};
  }

  &:disabled {
    background-color: ${color({ name: 'gray', weight: '200' })};
    cursor: auto;

    * {
      color: ${color({ name: 'gray', weight: '800' })};
    }
  }

  ${props => props.media && css`
    @media only screen and (${props.media}) {
      padding: 0.5em 1em;

      .uiButton-Content {
        display: none;
      }

      .uiButton-Icon {
        display: inline-block;
      }
    }
  `}

  ${props => !props.mediaPrintDisabled && css`
    @media print {
      display: none;
    }
  `}

  ${props => props.css}
`;
