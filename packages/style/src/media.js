import { css } from 'styled-components';

export default {
  print(...args) {
    return props => !props.mediaPrintDisabled && css`
      @media print {
        ${css(...args)}
      }
    `;
  },
};
