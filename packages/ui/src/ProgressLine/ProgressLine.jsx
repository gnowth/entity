import PropTypes from 'prop-types';
import React from 'react';

import * as S from './ProgressLine.styles';

const UIProgressLine = props => (
  <S.Block
    className={props.className}
    height={props.height}
    $margin={props.margin}
    $padding={props.padding}
  >
    <S.Buffer
      palette={props.bufferPalette}
      value={props.bufferValue}
    />

    <S.BarPrimary value={props.value}>
      <S.BarPrimaryInner
        palette={props.palette}
        paletteWeight={props.paletteWeight}
        value={props.value}
      />
    </S.BarPrimary>

    { props.value === null && (
      <S.BarSecondary>
        <S.BarSecondaryInner
          palette={props.palette}
          paletteWeight={props.paletteWeight}
        />
      </S.BarSecondary>
    )}
  </S.Block>
);

UIProgressLine.propTypes = {
  bufferPalette: PropTypes.string,
  bufferValue: PropTypes.number,
  height: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  palette: PropTypes.string,
  paletteWeight: PropTypes.string,
  value: PropTypes.number,
};

UIProgressLine.defaultProps = {
  bufferPalette: undefined,
  bufferValue: 100,
  height: '4px',
  margin: undefined,
  padding: undefined,
  palette: undefined,
  paletteWeight: undefined,
  value: null,
};

export default UIProgressLine;
