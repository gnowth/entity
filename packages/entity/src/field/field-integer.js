export default class IntegerField extends NumberField {
  dataToValue(data = null) { // eslint-disable-line class-methods-use-this
    const value = parseInt(data, 10);

    return Number.isNaN(value) ? null : value;
  }
}
