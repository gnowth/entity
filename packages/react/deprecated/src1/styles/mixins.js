import { css } from 'styled-components';

const withInputBox = css`
  border: 1px solid ${props => props.theme.vars.color.primary};
  border-radius: ${props => props.theme.vars.borderRadius.small};
`;

const withOpacityForDisabled = css`
  &[disabled] {
    opacity: ${props => props.theme.vars.opacity.inactive};
  }
`;

const withOpacityForReadOnly = css`
  &[readonly] {
    opacity: ${props => props.theme.vars.opacity.inactive};
  }
`;

export default {
  withOpacityForDisabled,
  withOpacityForReadOnly,
  withInputBox,
};
