export default {
  defaultMeta: {},
  hasPayload: true,
  meta: {},
  payload: undefined,
  promise: Promise.resolve(),

  init(payload, meta) {
    this.meta = Object.assign(
      {},
      this.defaultMeta,
      this.metaFromPayload(payload),
      this.hasPayload ? meta : payload,
    );

    this.payload = this.hasPayload ? payload : meta;

    return this;
  },

  effect() {
    this.promise = Promise.resolve();

    return this;
  },

  metaFromPayload() {
    return {};
  },
};
