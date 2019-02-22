import { boxshadow, color } from '@gnowth/style';
import { css } from 'styled-components';

export default {
  header: css`
    ${boxshadow({ name: 'material1' })}

    background: ${color({ name: 'white' })};
    padding: 0.35rem 1rem;
  `,
};
