import PropTypes from 'prop-types';
import React from 'react';

import ProgressCircle from '../ProgressCircle';
import { Button, LinkHyper, LinkRouter } from './styles';

// TODO use locale and children
const UIButton = ({ processing, ...props }) => (
  <>
    { props.to && /^https?:\/\//.exec(props.to) && (
      <LinkHyper {...props}>
        { props.label }
      </LinkHyper>
    )}

    { props.to && !/^https?:\/\//.exec(props.to) && (
      <LinkRouter {...props}>
        { props.label }
      </LinkRouter>
    )}

    { !props.to && (
      <Button {...props}>
        { processing && (
          <ProgressCircle size="0.75rem" />
        )}

        { !processing && props.label }
      </Button>
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
