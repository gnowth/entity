import { getPalettes } from '@gnowth/theme';

import palettes from './palettes.json';

import * as theme from './theme';
import global from './global';

export default {
  ...theme,
  global,

  ...getPalettes(palettes),
};
