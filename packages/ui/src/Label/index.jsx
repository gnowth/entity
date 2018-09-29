import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import UITypeSet from '../TypeSet';

const Label = styled.label`
  display: block;
  ${props => props.css}
`;

const UILabel = props => (
  <Label className={props.className} css={props.css}>
    { props.label }

    { !props.label && props.labelLocale && (
      <UITypeSet
        name="label"
        component="span"
        {...props.labelLocale}
      />
    )}

    { props.children }
  </Label>
);

UILabel.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  labelLocale: PropTypesPlus.locale,
};

UILabel.defaultProps = {
  children: undefined,
  label: undefined,
  labelLocale: undefined,
};

export default UILabel;
