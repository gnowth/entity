import styled, { css } from 'styled-components';
import { color, colorFromPalette, media, mixins } from '@burnsred/theme';

export default styled.button`
  align-items: center;
  background-color: ${props => (props.$paletteAsBackground ? colorFromPalette()(props) : 'transparent')};
  border: 0;
  border-radius: 0.25em;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: 0.5em 1.5em;
  position: relative;
  text-decoration: none;

  ${mixins.space}

  &:hover {
    background-color: ${color({ palette: 'gray', paletteWeight: '50' })};
  }

  &:focus {
    background-color: ${color({ palette: 'gray', paletteWeight: '100' })};
  }

  &:disabled {
    background-color: ${color({ palette: 'gray', paletteWeight: '200' })};
    cursor: auto;

    * {
      color: ${color({ palette: 'gray', paletteWeight: '800' })};
    }
  }

  ${props => props.$media && css`
    @media only screen and (${props.$media}) {
      padding: 0.5em 1em;

      .uiButton-Content {
        display: none;
      }

      .uiButton-Icon {
        display: inline-block;
      }
    }
  `}

  ${media.print`
    display: none;
  `}

  ${props => props.css}
`;
