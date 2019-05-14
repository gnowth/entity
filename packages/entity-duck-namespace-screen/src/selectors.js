import Duck from '@burnsred/entity-duck';

export default class Screen extends Duck.Selectors {
  record(state, meta = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (meta.id !== null) throw new Error(`ScreenDuck.record (${this.name}): only support id === null`);
    }

    return this.getState(state).get(meta.dirty ? 'detail_dirty' : 'detail');
  }
}
