import PropTypes from 'prop-types';
import React from 'react';

import { BarPrimary, BarPrimaryInner, BarSecondary, BarSecondaryInner, BarWrapper, Block, Buffer } from './ProgressLine.styles';

function UIProgressLine(props) {
  const [value, setValue] = React.useState(props.valueInitial === undefined ? props.value : props.valueInitial);
  const [bufferValue, setBufferValue] = React.useState(props.bufferValueInitial === undefined ? props.bufferValue : props.bufferValueInitial);

  React.useEffect(
    () => {
      setTimeout(
        () => {
          setValue(props.value);
          setBufferValue(props.bufferValue);
        },
        0,
      );
    },
    [props.value, props.bufferValue],
  );

  return (
    <Block
      className={props.className}
      height={props.height}
      $margin={props.margin}
      $marginBottom={props.marginBottom}
      $marginLeft={props.marginLeft}
      $marginRight={props.marginRight}
      $marginTop={props.marginTop}
    >
      <Buffer
        palette={props.bufferPalette}
        paletteWeight={props.bufferPaletteWeight}
        transitionDuration={props.transitionDuration}
        value={bufferValue}
      />

      <BarWrapper thickness={props.thickness || props.height}>
        <BarPrimary value={props.value} transitionDuration={props.transitionDuration}>
          <BarPrimaryInner
            palette={props.palette}
            paletteWeight={props.paletteWeight}
            transitionDuration={props.transitionDuration}
            value={value}
          />
        </BarPrimary>

        { value === null && (
          <BarSecondary>
            <BarSecondaryInner
              palette={props.palette}
              paletteWeight={props.paletteWeight}
            />
          </BarSecondary>
        )}
      </BarWrapper>
    </Block>
  );
}

UIProgressLine.propTypes = {
  bufferPalette: PropTypes.string,
  bufferPaletteWeight: PropTypes.string,
  bufferValue: PropTypes.number,
  bufferValueInitial: PropTypes.number,
  height: PropTypes.string,
  margin: PropTypes.string,
  marginBottom: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  marginTop: PropTypes.string,
  palette: PropTypes.string,
  paletteWeight: PropTypes.string,
  thickness: PropTypes.string,
  transitionDuration: PropTypes.string,
  value: PropTypes.number,
  valueInitial: PropTypes.number,
};

UIProgressLine.defaultProps = {
  bufferPalette: undefined,
  bufferPaletteWeight: undefined,
  bufferValue: 100,
  bufferValueInitial: undefined,
  height: '4px',
  margin: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
  marginRight: undefined,
  marginTop: undefined,
  palette: undefined,
  paletteWeight: undefined,
  thickness: undefined,
  transitionDuration: undefined,
  value: null,
  valueInitial: undefined,
};

export default UIProgressLine;
