import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import UITypeSet from '../TypeSet';
import UIProgressCircle from '../ProgressCircle';
import { Button, LinkHyper, LinkRouter } from './styles';

// TODO check that eslint for prop-types is running
const UIButton = ({ processing, ...props }) => (
  <>
    { props.to && /^https?:\/\//.exec(props.to) && (
      <LinkHyper {...props}>
        <UITypeSet locale={props.locale} component={null}>{ props.children }</UITypeSet>
      </LinkHyper>
    )}

    { props.to && !/^https?:\/\//.exec(props.to) && (
      <LinkRouter {...props}>
        <UITypeSet locale={props.locale} component={null}>{ props.children }</UITypeSet>
      </LinkRouter>
    )}

    { !props.to && (
      <Button {...props}>
        { processing && (
          <UIProgressCircle size="0.75rem" />
        )}

        { !processing && (
          <UITypeSet locale={props.locale} component={null}>{ props.children }</UITypeSet>
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
  variant: 'outlined',
};

export default UIButton;
