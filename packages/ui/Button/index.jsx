import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import * as S from './style';

const UIButton = props => (
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
          { props.label }
        </S.Button>

        <S.ButtonResponsive {...props}>
          { props.labelResponsive }
        </S.ButtonResponsive>
      </>
    )}
  </>
);

UIButton.propTypes = {
  to: PropTypes.string,
  // urlRegex:
  media: PropTypes.func,
};

UIButton.defaultProps = {
  to: '',
};

export default UIButton;
