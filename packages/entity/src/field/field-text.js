import CharField from './field-char';

export default class TextField extends CharField {
  constructor(options) {
    super(Object.assign({ type: 'text' }, options));
  }
}
