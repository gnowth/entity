import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { mixins } from '@burnsred/theme';
import { UIType } from '@burnsred/ui';

import WidgetCheckbox from '../../Checkbox';

const Container = styled.li`
  align-items: center;
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};

  ${mixins.space}
`;

const OptionEnumRadio = props => (
  <Container
    className={props.className}
    css={props.css}
    inline={props.inline}
    $margin={props.margin}
    $marginBottom={props.marginBottom}
    $marginLeft={props.marginLeft}
    $marginRight={props.marginRight}
    $marginTop={props.marginTop}
    $padding={props.padding}
    $paddingBottom={props.paddingBottom}
    $paddingLeft={props.paddingLeft}
    $paddingRight={props.paddingRight}
    $paddingTop={props.paddingTop}
    {...props.containerComponentProps}
  >
    <WidgetCheckbox
      iconFontSize="1.5rem"
      marginRight="0.5rem"
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
  marginBottom: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  marginTop: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  padding: PropTypes.string,
  paddingBottom: PropTypes.string,
  paddingLeft: PropTypes.string,
  paddingRight: PropTypes.string,
  paddingTop: PropTypes.string,
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
  marginBottom: undefined,
  marginLeft: undefined,
  marginRight: undefined,
  marginTop: undefined,
  padding: undefined,
  paddingBottom: undefined,
  paddingLeft: undefined,
  paddingRight: undefined,
  paddingTop: undefined,
  selected: undefined,
  value: undefined,
};

export default OptionEnumRadio;
