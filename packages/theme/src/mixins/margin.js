import { createMixin } from '../utils';

const margin = createMixin({
  css: 'margin',
  prop: '$margin',
  scale: 'space',
});

const marginBottom = createMixin({
  css: 'marginBottom',
  prop: '$marginBottom',
  scale: 'space',
});

const marginLeft = createMixin({
  css: 'marginLeft',
  prop: '$marginLeft',
  scale: 'space',
});

const marginRight = createMixin({
  css: 'marginRight',
  prop: '$marginRight',
  scale: 'space',
});

const marginTop = createMixin({
  css: 'marginTop',
  prop: '$marginTop',
  scale: 'space',
});

export default props => ({
  ...margin(props),
  ...marginBottom(props),
  ...marginLeft(props),
  ...marginRight(props),
  ...marginTop(props),
});
