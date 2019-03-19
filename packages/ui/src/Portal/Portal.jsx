import React from 'react';
import ReactDOM from 'react-dom';

function Portal(props) {
  const [elementRef, setElementRef] = React.useState(null);
  const previousClassNameRef = React.useRef(props.className);
  const previousClassName = previousClassNameRef.current;

  React.useEffect(
    () => { previousClassNameRef.current = props.className; },
  );

  React.useEffect(
    () => {
      const element = document.createElement('div');
      setElementRef(element);
      document.body.appendChild(element);

      return () => document.body.removeChild(element);
    },
    [],
  );

  React.useEffect(
    () => {
      if (elementRef && previousClassName) {
        elementRef.classList.remove(...previousClassName.split(' '));
      }

      if (elementRef && props.className) {
        elementRef.classList.add(...props.className.split(' '));
      }
    },
    [elementRef, props.className, previousClassName],
  );

  return elementRef && ReactDOM.createPortal(
    props.children,
    elementRef,
  );
}

export default Portal;
