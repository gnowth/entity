import { createMixin } from '../utils';

const padding = createMixin({
  css: 'padding',
  prop: '$padding',
});

const paddingBottom = createMixin({
  css: 'paddingBottom',
  prop: '$paddingBottom',
});

const paddingLeft = createMixin({
  css: 'paddingLeft',
  prop: '$paddingLeft',
});

const paddingRight = createMixin({
  css: 'paddingRight',
  prop: '$paddingRight',
});

const paddingTop = createMixin({
  css: 'paddingTop',
  prop: '$paddingTop',
});

export default props => ({
  ...padding(props),
  ...paddingBottom(props),
  ...paddingLeft(props),
  ...paddingRight(props),
  ...paddingTop(props),
});
