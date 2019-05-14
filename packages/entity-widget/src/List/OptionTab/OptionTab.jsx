import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { UIType } from '@burnsred/ui';
import { css } from 'styled-components';

const textStyle = css`
  cursor: ${props => (props.selected ? 'auto' : 'pointer')};
  display: inline-block;
  margin-right: 0.25rem;
  padding: 0.25rem 0.5rem;

  ${props => props.selected && css`
    border-bottom: 2px solid;
  `}
`;

const OptionTab = props => (
  <UIType
    as="li"
    disabled={props.disabled}
    field={props.field}
    onClick={props.onClick}
    palette={props.selected ? 'primary' : 'grey'}
    selected={props.selected}
    variant={props.selected ? 'tab_active' : 'tab'}
    value={props.value}
    {...{ css: textStyle }} // TODO need to fix but when putting css directly
  />
);

OptionTab.propTypes = {
  disabled: PropTypes.bool,
  field: PropTypesEntity.field.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  value: PropTypesPlus.value.isRequired,
};

OptionTab.defaultProps = {
  disabled: undefined,
};

export default OptionTab;
