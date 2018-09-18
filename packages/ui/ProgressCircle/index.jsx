import PropTypes from 'prop-types';
import React from 'react';

import * as S from './style';

const ProgressCircle = props => (
  <S.Container {...props}>
    <S.SVG
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 100 100"
    >
      <S.Circle
        cx="50%"
        cy="50%"
        r={(50 - props.thickness / 2).toString()}
        value={props.value}
        thickness={props.thickness}
      />
    </S.SVG>
  </S.Container>
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
