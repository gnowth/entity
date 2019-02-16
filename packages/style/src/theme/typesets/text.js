import { css } from 'styled-components';

import { color, mixin } from '../../selectors';
import baseCss from './base';

export const component_uiType_text = {
  css: css`
    ${baseCss}

    ${mixin({ name: 'disabled' })}
    ${mixin({ name: 'readOnly' })}
  `,
};

export const component_uiType_text_danger = {
  css: css`
    ${baseCss}
    color: ${color({ name: 'danger' })};

    ${mixin({ name: 'disabled' })}
    ${mixin({ name: 'readOnly' })}
  `,
};

export const component_uiType_text_gray = {
  css: css`
    ${baseCss}
    color: ${color({ name: 'gray' })};

    ${mixin({ name: 'disabled' })}
    ${mixin({ name: 'readOnly' })}
  `,
};

export const component_uiType_text_primary = {
  css: css`
    ${baseCss}
    color: ${color({ name: 'primary' })};

    ${mixin({ name: 'disabled' })}
    ${mixin({ name: 'readOnly' })}
  `,
};

export const component_uiType_text_secondary = {
  css: css`
    ${baseCss}
    color: ${color({ name: 'secondary' })};

    ${mixin({ name: 'disabled' })}
    ${mixin({ name: 'readOnly' })}
  `,
};

export const component_uiType_text_white = {
  css: css`
    ${baseCss}
    color: ${color({ name: 'white' })};

    ${mixin({ name: 'disabled' })}
    ${mixin({ name: 'readOnly' })}
  `,
};
