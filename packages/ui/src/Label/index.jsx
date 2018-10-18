import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import UIError from '../Error';
import UITooltip from '../Tooltip';
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

    { props.errors && props.errors.size > 0 && (
      <UITooltip componentProps={{ name: 'error' }}>
        { props.errors.map((error, index) => ( // TODO remove eslint disable
          <UIError key={index}>{ error }</UIError> // eslint-disable-line
        ))}
      </UITooltip>
    )}

    { props.children }
  </Label>
);

UILabel.propTypes = {
  children: PropTypes.node,
  errors: PropTypesImmutable.list,
  label: PropTypes.string,
  labelLocale: PropTypesPlus.locale,
};

UILabel.defaultProps = {
  children: undefined,
  errors: undefined,
  label: undefined,
  labelLocale: undefined,
};

export default UILabel;
