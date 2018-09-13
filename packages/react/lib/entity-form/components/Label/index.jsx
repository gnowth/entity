import _omit from 'lodash/fp/omit';
import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import UITypeSet from 'lib/ui/TypeSet';

const Component = props => (
  <UITypeSet
    name="label"
    component="label"
    {..._omit(['inline', 'reverse', 'required'])(props)}
  >
    { props.required && (
      <UITypeSet name="text_danger" component="span">
        *&nbsp;
      </UITypeSet>
    )}

    { props.children }
  </UITypeSet>
);

Component.propTypes = {
  children: PropTypes.node,
  required: PropTypes.bool,
};

Component.defaultProps = {
  children: undefined,
  required: false,
};

export default styled(Component)`
  ${props => props.inline && css`
    margin-${props.reverse ? 'left' : 'right'}: 5px;
  `}
`;
