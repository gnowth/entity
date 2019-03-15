import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { mixin } from '@gnowth/theme';
import { UIType } from '@gnowth/ui';

import WidgetCheckbox from '../../Checkbox';

const Container = styled.li`
  align-items: center;
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};

  ${mixin({ name: 'margin' })}
  ${mixin({ name: 'padding' })}
`;

const OptionEnumRadio = props => (
  <Container
    className={props.className}
    css={props.css}
    inline={props.inline}
    $margin={props.margin}
    $padding={props.padding}
    {...props.containerComponentProps}
  >
    <WidgetCheckbox
      iconFontSize="1.5rem"
      margin="0 0.5rem 0 0"
      onChange={props.onClick}
      value={props.selected}
      variant="radio"
      {...props.booleanComponentProps}
    />

    <UIType
      field={props.field}
      value={props.value}
      {...props.labelComponentProps}
    />
  </Container>
);

OptionEnumRadio.propTypes = {
  booleanComponentProps: PropTypes.shape({}),
  containerComponentProps: PropTypes.shape({}),
  css: PropTypesPlus.css,
  field: PropTypesEntity.field.isRequired,
  inline: PropTypes.bool,
  labelComponentProps: PropTypes.shape({}),
  margin: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  padding: PropTypes.string,
  selected: PropTypes.bool,
  value: PropTypesPlus.value,
};

OptionEnumRadio.defaultProps = {
  booleanComponentProps: undefined,
  containerComponentProps: undefined,
  css: undefined,
  inline: undefined,
  labelComponentProps: undefined,
  margin: undefined,
  padding: undefined,
  selected: undefined,
  value: undefined,
};

export default OptionEnumRadio;
