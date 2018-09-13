import { css } from 'styled-components';

const wgText = css`
  ${props => props.theme.mixins.withInputBox}
  ${props => props.theme.mixins.withOpacityForDisabled}
  ${props => props.theme.mixins.withOpacityForReadOnly}
  padding: 0.5rem;
`;

const wgTextArea = css`
  ${props => props.theme.mixins.withInputBox}
  ${props => props.theme.mixins.withOpacityForDisabled}
  ${props => props.theme.mixins.withOpacityForReadOnly}
  padding: 0.5rem;
`;

export default {
  wgText,
  wgTextArea,
};
