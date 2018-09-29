import { Query } from '@entity/duck-query';
import { FormProvider } from '@entity/form';
import { WidgetBoolean, WidgetDate, WidgetInput, WidgetSelect, WidgetTextarea } from '@entity/widget';
import { UIButton, UILabel, UIProcessing } from '@gnowth/ui';

import store from 'store';

export default {
  store,
  button: UIButton,
  formProvider: FormProvider,
  label: UILabel,
  processing: UIProcessing,
  processingDidFail: () => 'Unable to load data. Try to refresh the page',
  query: Query,
  recordCount: ({ value }) => `${value} Record(s) Found`,
  recordCountNone: () => 'No Records Found',
  widget: {
    boolean: WidgetBoolean,
    char: WidgetInput,
    date: WidgetDate,
    entity: WidgetSelect,
    text: WidgetTextarea,
  },
  // error: 'UIError',
};
