import moment from 'moment';

import AnyField from './field-any';

export default class DateField extends AnyField {
  constructor(configs = {}) {
    super({
      allowTime: false,
      dateFormat: 'YYYY-MM-DD',
      type: 'date',
      ...configs,
    });
  }

  dataToValue(data) {
    return data && moment(data);
  }

  toData(value) {
    return value && value.format(this.dateFormat);
  }

  toParams(value) {
    return (value && value.format(this.dateFormat)) || '';
  }

  toString(value) {
    return (value && value.format(this.dateFormat)) || '';
  }
}
