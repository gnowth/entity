import { boxshadow, color } from '@gnowth/style';
import { css } from 'styled-components';

export default {
  buttons: css`
    margin-right: 1rem;
  `,

  header: css`
    background: ${color({ name: 'white' })};
    padding: 1rem;

    ${boxshadow({ name: 'material1' })}
  `,
};
