import _mergeWith from 'lodash/mergeWith';
import { css } from 'styled-components';

export default (objValue, srcValue) => _mergeWith(
  Object.assign({}, objValue),
  srcValue,
  (obj, src) => css`${obj} ${src}`,
);
