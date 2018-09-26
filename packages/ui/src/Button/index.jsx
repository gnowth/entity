import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import ProgressCircle from '../ProgressCircle';
import * as S from './style';

const UIButton = ({ processing, ...props }) => (
  <>
    { props.to && /^https?:\/\//.exec(props.to) && (
      <>
        <S.HyperLink>
          { props.label }
        </S.HyperLink>

        <S.HyperLinkResponsive>
          { props.labelResponsive }
        </S.HyperLinkResponsive>
      </>
    )}

    { props.to && /^https?:\/\//.exec(props.to) && (
      <Link {...props}>
        { props.label }
      </Link>
    )}

    { !props.to && (
      <>
        <S.Button {...props}>
          { processing && (
            <ProgressCircle size="0.75rem" />
          )}

          { !processing && props.label }
        </S.Button>

        <S.ButtonResponsive {...props}>
          { props.labelResponsive }
        </S.ButtonResponsive>
      </>
    )}
  </>
);

UIButton.propTypes = {
  processing: PropTypes.bool,
  to: PropTypes.string,
  variant: PropTypes.string,
};

UIButton.defaultProps = {
  processing: false,
  to: '',
  variant: 'outlined',
};

export default UIButton;
