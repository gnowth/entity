import { color, mixin } from '@gnowth/style';
import { css } from 'styled-components';

import baseCss from './base';

export const text = {
  root: css`
    ${baseCss}

    ${mixin({ name: 'disabled' })}
    ${mixin({ name: 'readOnly' })}
  `,
};

export const text_danger = {
  root: css`
    ${baseCss}
    color: ${color({ name: 'danger' })};

    ${mixin({ name: 'disabled' })}
    ${mixin({ name: 'readOnly' })}
  `,
};

export const text_gray = {
  root: css`
    ${baseCss}
    color: ${color({ name: 'gray' })};

    ${mixin({ name: 'disabled' })}
    ${mixin({ name: 'readOnly' })}
  `,
};

export const text_primary = {
  root: css`
    ${baseCss}
    color: ${color({ name: 'primary' })};

    ${mixin({ name: 'disabled' })}
    ${mixin({ name: 'readOnly' })}
  `,
};

export const text_secondary = {
  root: css`
    ${baseCss}
    color: ${color({ name: 'secondary' })};

    ${mixin({ name: 'disabled' })}
    ${mixin({ name: 'readOnly' })}
  `,
};

export const text_white = {
  root: css`
    ${baseCss}
    color: ${color({ name: 'white' })};

    ${mixin({ name: 'disabled' })}
    ${mixin({ name: 'readOnly' })}
  `,
};
