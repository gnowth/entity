export default function shallowEqual(objA, objB, shallowCheckForKeys = []) {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i])) return false;

    if (shallowCheckForKeys.includes(keysA[i])) {
      if (shallowEqual(objA[keysA[i]], objB[keysA[i]])) continue; // eslint-disable-line no-continue

      return false;
    }

    if (!Object.is(objA[keysA[i]], objB[keysA[i]])) return false;
  }

  return true;
}
