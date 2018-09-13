export default function ({ payload: payloadCreator = x => x, meta = ({ options }) => options } = {}) {
  return type => (payload, options = {}) => ({
    type,
    payload: payloadCreator(payload),
    meta: meta({ payload, options }),
  });
}
