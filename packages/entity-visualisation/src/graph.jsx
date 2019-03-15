import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';

import { VisualisationProvider } from './context';

function Graph(props) {
  const graphRef = React.useRef(null);
  const Component = props.component;

  React.useEffect(
    () => {
      if (graphRef.current) props.onMount({ graphRef });
    },
    [graphRef.current],
  );

  return (
    <VisualisationProvider
      data={props.data}
      graphRef={graphRef}
      height={props.height}
      width={props.width}
    >
      <Component
        className={props.className}
        height={props.height}
        ref={graphRef}
        width={props.width}
        {...props.componentProps}
      >
        { props.children }
      </Component>
    </VisualisationProvider>
  );
}

Graph.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  componentProps: PropTypes.shape({}),
  data: PropTypesImmutable.list,
  onMount: PropTypes.func,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

Graph.defaultProps = {
  component: 'svg',
  componentProps: undefined,
  data: undefined,
  onMount: () => undefined,
};

export default React.memo(Graph);
