import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import { Circle, Container, SVG } from './ProgressCircle.styles';

const ProgressCircle = props => (
  <Container {...props}>
    <SVG
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 100 100"
    >
      <Circle
        cx="50%"
        cy="50%"
        palette={props.palette}
        paletteAsBackground={props.paletteAsBackground}
        paletteWeight={props.paletteWeight}
        r={(50 - props.thickness / 2).toString()}
        thickness={props.thickness}
        value={props.value}
      />
    </SVG>
  </Container>
);

ProgressCircle.propTypes = {
  palette: PropTypesPlus.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  size: PropTypes.string,
  value: PropTypes.number,
  thickness: PropTypes.number,
};

ProgressCircle.defaultProps = {
  palette: undefined,
  paletteAsBackground: undefined,
  paletteWeight: undefined,
  size: '32px',
  value: null,
  thickness: 20,
};

export default ProgressCircle;
