import { createMixin } from '../utils';

const padding = createMixin({
  css: 'padding',
  prop: '$padding',
  scale: 'space',
});

const paddingBottom = createMixin({
  css: 'paddingBottom',
  prop: '$paddingBottom',
  scale: 'space',
});

const paddingLeft = createMixin({
  css: 'paddingLeft',
  prop: '$paddingLeft',
  scale: 'space',
});

const paddingRight = createMixin({
  css: 'paddingRight',
  prop: '$paddingRight',
  scale: 'space',
});

const paddingTop = createMixin({
  css: 'paddingTop',
  prop: '$paddingTop',
  scale: 'space',
});

export default props => ({
  ...padding(props),
  ...paddingBottom(props),
  ...paddingLeft(props),
  ...paddingRight(props),
  ...paddingTop(props),
});
