import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import UIType from '../Type';
import UIProgressCircle from '../ProgressCircle';
import { Button, LinkHyper, LinkRouter } from './Button.styles';

const UIButton = ({ processing, ...props }) => (
  <>
    { props.to && /^https?:\/\//.exec(props.to) && (
      <LinkHyper {...props} href={props.to}>
        <UIType value={props.locale} component={null}>{ props.children }</UIType>
      </LinkHyper>
    )}

    { props.to && !/^https?:\/\//.exec(props.to) && (
      <LinkRouter {...props}>
        <UIType value={props.locale} component={null}>{ props.children }</UIType>
      </LinkRouter>
    )}

    { !props.to && (
      <Button {...props}>
        { processing && (
          <UIProgressCircle size="0.75rem" />
        )}

        { !processing && (
          <UIType value={props.locale} component={null}>{ props.children }</UIType>
        )}
      </Button>
    )}
  </>
);

UIButton.propTypes = {
  children: PropTypes.node,
  css: PropTypesPlus.css,
  locale: PropTypesPlus.locale,
  processing: PropTypes.bool,
  to: PropTypes.string,
  variant: PropTypes.string,
};

UIButton.defaultProps = {
  children: undefined,
  css: undefined,
  locale: undefined,
  processing: false,
  to: '',
  variant: 'main',
};

export default React.memo(UIButton);
