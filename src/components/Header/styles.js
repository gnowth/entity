import { css } from 'styled-components';

export default {
  buttons: css`
    margin-right: 1rem;
  `,

  header: css`
    background: ${props => props.theme.vars.colorWhite || 'white'};
    padding: 1rem;

    ${props => props.theme.boxShadows.material1}
  `,
};
