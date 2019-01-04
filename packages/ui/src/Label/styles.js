import styled, { css } from 'styled-components';

export const UILabelRoot = styled.div`
  ${props => props.css}
`;

export const Label = styled.label`
  ${props => props.css}
`;

export default {
  icon: css`
    color: ${props => props.theme.vars.colorDanger};

    && {
      font-size: 0.8rem;
    }
  `,
  tooltip: css`
    margin-left: 0.5rem;
  `,
};
