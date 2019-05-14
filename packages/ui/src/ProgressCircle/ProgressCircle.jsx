import PropTypes from 'prop-types';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { useCleanProps, useEnhanceProps } from '@burnsred/theme';

import { Circle, Container, SVG } from './ProgressCircle.styles';

function ProgressCircle(_props) {
  const props = useEnhanceProps(_props);
  const [value, setValue] = React.useState(props.valueInitial === undefined ? props.value : props.valueInitial);

  React.useEffect(
    () => { setTimeout(() => setValue(props.value), 0); },
    [props.value],
  );

  return (
    <Container {...useCleanProps(props)} css={props.css}>
      <SVG
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        value={value}
        viewBox="0 0 100 100"
      >
        { props.bufferPalette && (
          <Circle
            cx="50%"
            cy="50%"
            palette={props.bufferPalette}
            paletteWeight={props.bufferPaletteWeight}
            r={(50 - props.thickness / 2).toString()}
            thickness={props.thickness}
            transitionDuration={props.transitionDuration}
            value={100}
          />
        )}

        <Circle
          cx="50%"
          cy="50%"
          palette={props.$palette} // eslint-disable-line react/prop-types
          paletteWeight={props.$paletteWeight} // eslint-disable-line react/prop-types
          r={(50 - props.thickness / 2).toString()}
          thickness={props.thickness}
          transitionDuration={props.transitionDuration}
          value={value}
        />
      </SVG>
    </Container>
  );
}

ProgressCircle.propTypes = {
  bufferPalette: PropTypesPlus.string,
  bufferPaletteWeight: PropTypes.string,
  css: PropTypesPlus.css,
  namespace: PropTypes.string,
  palette: PropTypesPlus.string,
  paletteWeight: PropTypes.string,
  size: PropTypes.string,
  transitionDuration: PropTypes.string,
  value: PropTypes.number,
  valueInitial: PropTypes.number,
  thickness: PropTypes.number,
};

ProgressCircle.defaultProps = {
  bufferPalette: undefined,
  bufferPaletteWeight: undefined,
  css: undefined,
  namespace: 'component_uiProgressCircle',
  palette: undefined,
  paletteWeight: undefined,
  size: '32px',
  transitionDuration: undefined,
  value: null,
  valueInitial: undefined,
  thickness: 20,
};

export default ProgressCircle;
