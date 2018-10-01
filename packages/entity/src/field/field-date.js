export default class DateField extends AnyField {
  static type = 'date';

  constructor(options) {
    const newOptions = Object.assign(
      {
        dateFormat: 'YYYY-MM-DD',
        allowTime: false,
      },
      options,
    );

    super(newOptions);
  }

  dataToValue(data = null) { // eslint-disable-line class-methods-use-this
    return data && moment(data);
  }

  toString(value = null) {
    return value === null
      ? ''
      : value.format(this.dateFormat);
  }

  valueToData(data) {
    return data && this.toString(data);
  }
}
