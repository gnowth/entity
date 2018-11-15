import DateField from './field-date';

export default class DateTimeField extends DateField {
  constructor(options = {}) {
    super({
      dateFormat: 'YYYY-MM-DD HH:mm',
      allowTime: true,
      ...options,
    });
  }
}
