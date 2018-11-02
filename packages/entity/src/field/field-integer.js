import NumberField from './field-number';

export default class IntegerField extends NumberField {
  dataToValue(data) {
    const value = parseInt(data, 10);

    return Number.isNaN(value) ? null : value;
  }
}
