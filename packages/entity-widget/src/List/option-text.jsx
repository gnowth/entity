import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { UITypeSet } from '@gnowth/ui';
import { css } from 'styled-components';

const textStyle = css`
  cursor: ${props => (props.selected ? 'auto' : 'pointer')};
`;

const OptionText = props => (
  <UITypeSet
    variant="list_option_text"
    component="li"
    {...props}
    css={css`${props.css} ${textStyle}`}
  >
    { props.field.toString(props.value) }
  </UITypeSet>
);

OptionText.propTypes = {
  field: PropTypesEntity.field.isRequired,
  selected: PropTypes.bool.isRequired,
  value: PropTypesPlus.value.isRequired,
};

export default OptionText;
