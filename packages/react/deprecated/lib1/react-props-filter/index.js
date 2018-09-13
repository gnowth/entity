import { filterEntries } from 'lib/context-methods';

import eventAttributes from './attributes-event';
import htmlAttributes from './attributes-html';
import svgAttributes from './attributes-svg';

export const filterHtmlProps = props => (
  props::filterEntries((_, key) => (
    eventAttributes.has(key)
    || htmlAttributes.has(key)
  ))
);

export const filterSvgProps = props => (
  props::filterEntries((_, key) => (
    eventAttributes.has(key)
    || htmlAttributes.has(key)
    || svgAttributes.has(key)
  ))
);
