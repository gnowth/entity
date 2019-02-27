import getPalettes from '../get-palettes';
import palettes from './palettes.json';

import * as boxshadows from './boxshadows';
import * as mixins from './mixins';
import * as vars from './vars';

import * as uiButton from './components/UIButton';
import * as uiType from './components/UIType';
import * as uiCard from './components/UICard';
import * as viewLink from './components/ViewLink';
import * as widgetCheckbox from './components/WidgetCheckbox';
import * as widgetDate from './components/WidgetDate';
import * as widgetInput from './components/WidgetInput';
import * as widgetPagination from './components/WidgetPagination';
import * as widgetSelect from './components/WidgetSelect';
import * as widgetTextarea from './components/WidgetTextarea';
import global from './global';

export default {
  global,

  ...getPalettes(palettes),
  ...boxshadows,
  ...mixins,
  ...vars,

  ...uiButton,
  ...uiType,
  ...uiCard,
  ...viewLink,
  ...widgetCheckbox,
  ...widgetDate,
  ...widgetInput,
  ...widgetPagination,
  ...widgetSelect,
  ...widgetTextarea,
};
