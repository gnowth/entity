import DateField from './field-date';

export default class DateTimeField extends DateField {
  constructor(options) {
    const defaults = {
      dateFormat: 'YYYY-MM-DD HH:mm',
      allowTime: true,
    };

    super(Object.assign(defaults, options));
  }
}
