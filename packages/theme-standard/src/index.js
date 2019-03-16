import { utils } from '@gnowth/theme';

import palettes from './palettes.json';

import * as boxshadows from './boxshadows';
import * as vars from './vars';

import * as uiButton from './components/UIButton';
import * as uiProgressCircle from './components/UIProgressCircle';
import * as uiType from './components/UIType';
import * as uiCard from './components/UICard';
import * as viewLink from './components/ViewLink';
import * as widgetCheckbox from './components/WidgetCheckbox';
import * as widgetDate from './components/WidgetDate';
import * as widgetInput from './components/WidgetInput';
import * as widgetPagination from './components/WidgetPagination';
import * as widgetTextarea from './components/WidgetTextarea';
import global from './global';

export default {
  global,

  ...utils.getPalettes(palettes),
  ...boxshadows,
  ...vars,

  ...uiButton,
  ...uiCard,
  ...uiProgressCircle,
  ...uiType,
  ...viewLink,
  ...widgetCheckbox,
  ...widgetDate,
  ...widgetInput,
  ...widgetPagination,
  ...widgetTextarea,
};
