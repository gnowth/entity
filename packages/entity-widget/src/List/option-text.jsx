import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { UIType } from '@burnsred/ui';
import { css } from 'styled-components';

const textStyle = css`
  cursor: ${props => (props.selected ? 'auto' : 'pointer')};
`;

const OptionText = props => (
  <UIType
    as="li"
    css={textStyle}
    variant="body2"
    {...props}
  >
    { props.field.toString(props.value) }
  </UIType>
);

OptionText.propTypes = {
  css: PropTypesPlus.css,
  field: PropTypesEntity.field.isRequired,
  selected: PropTypes.bool.isRequired,
  value: PropTypesPlus.value.isRequired,
};

OptionText.defaultProps = {
  css: undefined,
};

export default OptionText;
