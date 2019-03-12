import styled, { css } from 'styled-components';
import { color } from '@gnowth/theme';

export const UILabelRoot = styled.div`
  ${props => props.css}
`;

export const Label = styled.label`
  ${props => props.css}
`;

export default {
  icon: css`
    color: ${color({ palette: 'danger' })};

    && {
      font-size: 0.8rem;
    }
  `,
  tooltip: css`
    margin-left: 0.5rem;
  `,
};
