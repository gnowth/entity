import { css } from 'styled-components';
import { lighten } from 'polished';

export const danger = css`
  color: ${props => props.theme.vars.colorDanger};
  background-color: ${props => lighten(0.275, props.theme.vars.colorDanger)}
`;

export const primary = css`
  color: ${props => props.theme.vars.colorPrimary};
`;

export const page = css`
  border: 0;
`;
