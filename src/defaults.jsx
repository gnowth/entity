import { Query } from '@entity/duck-query';
import { FormProvider } from '@entity/form';
import { WidgetBoolean, WidgetDate, WidgetInput, WidgetSelect, WidgetTextarea } from '@entity/widget';
import { UIButton, UILabel, UIProgressCircle } from '@gnowth/ui';
import { Redirect } from 'react-router-dom';

import store from 'store';

// TODO remove processing, processingDidFail, recordCount, recordCountNOne and check errors?
export default {
  store,
  button: UIButton,
  formProvider: FormProvider,
  label: UILabel,
  processing: UIProgressCircle,
  processingDidFail: () => 'Unable to load data. Try to refresh the page',
  query: Query,
  recordCount: ({ value }) => `${value} Record(s) Found`,
  recordCountNone: () => 'No Records Found',
  redirect: Redirect,
  widgets: {
    boolean: WidgetBoolean,
    char: WidgetInput,
    date: WidgetDate,
    entity: WidgetSelect,
    enum: WidgetSelect,
    text: WidgetTextarea,
  },
};
