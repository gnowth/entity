import Duck from './duck';

export default class ScreenDuck extends Duck {
  static namespace = 'screens';

  static actions = {
    onChange: Duck.createAction(),
  };

  static getReducers(types) {
    return {
      [types.onChange]: (state, action) => action.payload,
    };
  }

  record(state) {
    return state.getIn([this.app, this.constructor.namespace, this.entity.name]);
  }
}
