import shallowEqual from './shallow-equal';

export default function (propNames = []) {
  return (prevProps, nextProps) => shallowEqual(prevProps, nextProps, propNames);
}
