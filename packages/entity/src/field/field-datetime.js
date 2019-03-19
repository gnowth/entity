import DateField from './field-date';

export default class DateTimeField extends DateField {
  constructor(configs = {}) {
    super({
      dateFormat: 'YYYY-MM-DD HH:mm',
      allowTime: true,
      ...configs,
    });
  }
}
