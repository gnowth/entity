import { css } from 'styled-components';

export default {
  uiCard: css`
    ${props => props.theme.mixins.withInputBox}
  `,

  'uiCard.header': css`
    border-bottom: 1px solid ${props => props.theme.vars.color.primary};
    padding: 0.25rem;
  `,

  'uiCard.content': css`
    padding: 0.25rem;
    min-height: 4rem;
  `,

  'uiCard.footer': css`
    border-top: 1px solid ${props => props.theme.vars.color.primary};
    padding: 0.25rem;
  `,
};
