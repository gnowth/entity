import moment from 'moment';

import AnyField from './field-any';

export default class DateField extends AnyField {
  constructor(options = {}) {
    super({
      allowTime: false,
      dateFormat: 'YYYY-MM-DD',
      type: 'date',
      ...options,
    });
  }

  dataToValue(data) {
    return data && moment(data);
  }

  toData(value) {
    return value?.format(this.dateFormat);
  }

  toParams(value) {
    return value?.format(this.dateFormat) || '';
  }

  toString(value = null) {
    return value?.format(this.dateFormat) || '';
  }
}