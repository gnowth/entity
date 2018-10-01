export default class AnyField extends Field {
  dataToValue(data = null) { // eslint-disable-line class-methods-use-this
    return fromJS(data);
  }

  valueToData(value) { // eslint-disable-line class-methods-use-this
    return (List.isList(value) || Map.isMap(value))
      ? value.toJS()
      : value;
  }
}
