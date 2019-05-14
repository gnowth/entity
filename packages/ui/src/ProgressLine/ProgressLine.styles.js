import styled, { css, keyframes } from 'styled-components';
import { color, mixins } from '@burnsred/theme';

const primaryScale = keyframes`
  0% {
    transform: scaleX(0.08);
  }

  36.65% {
    animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    transform: scaleX(0.08);
  }

  65.15% {
    animation-timing-function: cubmic-bezier(0.06, 0.11, 0.6, 1);
    transform: scaleX(0.661479);
  }

  100% {
    transform: scaleX(0.08);
  }
`;

const primaryTranslate = keyframes`
  0% {
    transform: translateX(0);
  }

  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }

  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(83.67142%);
  }

  100% {
    transform: translateX(200.611057%);
  }
`;

const secondaryScale = keyframes`
  0% {
    animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.45397);
    transform: scaleX(0.08);
  }

  19.15% {
    animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    transform: scaleX(0.457104);
  }

  44.15% {
    animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    transform: scaleX(0.72796);
  }

  100% {
    transform: scaleX(0.08);
  }
`;

const secondaryTranslate = keyframes`
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }

  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(37.651913%);
  }

  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(84.386165%);
  }

  100% {
    transform: translateX(160.277782%);
  }
`;

export const Block = styled.div`
  display: flex;
  align-items: center;
  height: ${props => props.height};
  min-width: 2rem;
  overflow: hidden;
  position: relative;
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  transform: translateZ(0);

  ${mixins.margin}
`;

export const BarWrapper = styled.div`
  height: ${props => props.thickness};
  position: relative;
  flex: 1;
`;

export const Buffer = styled.div`
  background-color: ${props => color({ palette: props.palette || 'gray', paletteWeight: props.paletteWeight })(props)};
  height: 100%;
  position: absolute;
  transition: transform ${props => props.transitionDuration || '225ms'};
  transform-origin: left top;
  width: 100%;

  ${props => props.value !== null && css`
    transform: translateX(${props.value - 100}%);
  `}
`;

export const BarPrimary = styled.div`
  height: 100%;
  position: absolute;
  transform-origin: left top;
  width: 100%;

  ${props => props.value === null && css`
    transform: scaleX(0);
    animation: ${primaryTranslate} 2s infinite linear;
    left: -145.166611%;
    transition: none;
  `}
`;

export const BarPrimaryInner = styled.span`
  background-color: ${props => color({ palette: props.palette || 'primary', paletteWeight: props.paletteWeight })(props)};
  display: inline-block;
  height: 100%;
  position: absolute;
  width: 100%;

  ${props => props.value === null && css`
    animation: ${primaryScale} 2s infinite linear;
  `}

  ${props => props.value !== null && css`
    transform: translateX(${props.value - 100}%);
    transition: transform ${props.transitionDuration || '225ms'} cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  `}
`;

export const BarSecondary = styled.div`
  animation: ${secondaryTranslate} 2s infinite linear;
  height: 100%;
  left: -54.888891%;
  position: absolute;
  transition: none;
  transform-origin: left top;
  visibility: visible;
  width: 100%;
`;

export const BarSecondaryInner = styled.span`
  animation: ${secondaryScale} 2s infinite linear;
  background-color: ${props => color({ palette: props.palette || 'primary', paletteWeight: props.paletteWeight })(props)};
  display: inline-block;
  height: 100%;
  position: absolute;
  visibility: visible;
  width: 100%;
`;
