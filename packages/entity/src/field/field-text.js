import CharField from './field-char';

export default class TextField extends CharField {
  constructor(configs = {}) {
    super({ type: 'text', ...configs });
  }
}
