import styled, { css, keyframes } from 'styled-components';
import { color, mixins } from '@burnsred/theme';

const spinnerRotateLinear = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const spinnerStrokeRotate = props => keyframes`
  0% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.95}px`};
    transform: rotate(0);
  }

  12.5% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.2}px`};
    transform: rotate(0);
  }

  12.5001% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.2}px`};
    transform: rotateX(180deg) rotate(72.5deg);
  }

  25% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.95}px`};
    transform: rotateX(180deg) rotate(72.5deg);
  }

  25.0001% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.95}px`};
    transform: rotate(270deg);
  }

  37.5% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.2}px`};
    transform: rotate(270deg);
  }

  37.5001% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.2}px`};
    transform: rotateX(180deg) rotate(161.5deg);
  }

  50% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.95}px`};
    transform: rotateX(180deg) rotate(161.5deg);
  }

  50.0001% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.95}px`};
    transform: rotate(180deg);
  }

  62.5% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.2}px`};
    transform: rotate(180deg);
  }

  62.5001% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.2}px`};
    transform: rotateX(180deg) rotate(251.5deg);
  }

  75% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.95}px`};
    transform: rotateX(180deg) rotate(251.5deg);
  }

  75.0001% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.95}px`};
    transform: rotate(90deg);
  }

  87.5% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.2}px`};
    transform: rotate(90deg);
  }

  87.5001% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.2}px`};
    transform: rotateX(180deg) rotate(341.5deg);
  }

  100% {
    stroke-dashoffset: ${`${(100 - props.thickness) * Math.PI * 0.95}px`};
    transform: rotateX(180deg) rotate(341.5deg);
  }
`;

export const Circle = styled.circle`
  animation-name: ${props => spinnerStrokeRotate(props)};
  fill: transparent;
  stroke: ${props => color({ palette: props.palette || 'primary', paletteWeight: props.paletteWeight })(props)};
  stroke-dasharray: ${props => `${(100 - props.thickness) * Math.PI}px`};
  stroke-width: ${props => `${props.thickness}%`};
  transition: stroke-dashoffset ${props => props.transitionDuration || '225ms'} linear;
  transform-box: view-box;
  transform-origin: center;

  ${props => props.value === null && css`
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
    transition-property: stroke;
  `}

  ${props => props.value !== null && css`
    stroke-dashoffset: ${(100 - props.thickness) * Math.PI * (100 - props.value) / 100}px;
  `}
`;

export const Container = styled.div`
  display: inline-block;
  height: ${props => props.size};
  position: relative;
  width: ${props => props.size};

  ${mixins.margin}
  ${mixins.padding}
`;

export const SVG = styled.svg`
  height: 100%;
  left: 0;
  top: 0;
  overflow: visible;
  position: absolute;
  transform: rotate(-90deg);
  transform-origin: center;
  width: 100%;

  ${props => props.value === null && css`
    animation: ${spinnerRotateLinear} 2s linear infinite;
  `}
`;
