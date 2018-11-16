import PropTypes from 'prop-types';
import React from 'react';

import { Circle, Container, SVG } from './styles';

const ProgressCircle = props => (
  <Container {...props}>
    <SVG
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 100 100"
    >
      <Circle
        color={props.color}
        cx="50%"
        cy="50%"
        r={(50 - props.thickness / 2).toString()}
        thickness={props.thickness}
        value={props.value}
      />
    </SVG>
  </Container>
);

ProgressCircle.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  value: PropTypes.number,
  thickness: PropTypes.number,
};

ProgressCircle.defaultProps = {
  color: undefined,
  size: '32px',
  value: null,
  thickness: 20,
};

export default ProgressCircle;
