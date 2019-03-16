import { createMixin } from '../utils';

const margin = createMixin({
  css: 'margin',
  prop: '$margin',
});

const marginBottom = createMixin({
  css: 'marginBottom',
  prop: '$marginBottom',
});

const marginLeft = createMixin({
  css: 'marginLeft',
  prop: '$marginLeft',
});

const marginRight = createMixin({
  css: 'marginRight',
  prop: '$marginRight',
});

const marginTop = createMixin({
  css: 'marginTop',
  prop: '$marginTop',
});

export default props => ({
  ...margin(props),
  ...marginBottom(props),
  ...marginLeft(props),
  ...marginRight(props),
  ...marginTop(props),
});
