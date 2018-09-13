import PropTypes from 'prop-types';
import React from 'react';

import * as S from './style';

const UIProgressLine = props => (
  <S.Block className={props.className} height={props.height}>
    <S.Buffer color={props.colorBuffer} />

    <S.BarPrimary
      color={props.color}
      value={props.value}
    >
      <S.BarPrimaryInner
        color={props.color}
        value={props.value}
      />
    </S.BarPrimary>

    { props.value === null && (
      <S.BarSecondary color={props.color}>
        <S.BarSecondaryInner color={props.color} />
      </S.BarSecondary>
    )}
  </S.Block>
);

UIProgressLine.propTypes = {
  color: PropTypes.string,
  colorBuffer: PropTypes.string,
  height: PropTypes.string,
  value: PropTypes.number,
};

UIProgressLine.defaultProps = {
  color: undefined,
  colorBuffer: undefined,
  height: '4px',
  value: null,
};

export default UIProgressLine;
