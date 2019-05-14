import PropTypes from 'prop-types';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { useEnhanceProps } from '@burnsred/theme';
import { UIIcon } from '@burnsred/ui';

import { Container, Input } from './Boolean.styles';
import hooks from './Boolean.hooks';

function WidgetBoolean(_props) {
  const ref = React.useRef();
  const props = useEnhanceProps(_props, { inputComponentProps: { ref } });
  const containerProps = hooks.usePropsContainer(props);
  const iconProps = hooks.usePropsIcon(props);
  const inputProps = { ref, ...hooks.usePropsInput(props) };

  hooks.useHandleIndeterminate(props, { ref: inputProps.ref });

  return (
    <Container {...containerProps} css={containerProps.css}>
      <UIIcon {...iconProps} css={iconProps.css} />

      <Input {...inputProps} css={inputProps.css} />
    </Container>
  );
}

WidgetBoolean.propTypes = {
  containerComponent: PropTypesPlus.component,
  containerComponentProps: PropTypes.shape({}),
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  iconComponent: PropTypesPlus.component,
  iconComponentProps: PropTypes.shape({}),
  iconComponentPropsFalse: PropTypes.shape({}),
  iconComponentPropsNull: PropTypes.shape({}),
  iconComponentPropsTrue: PropTypes.shape({}),
  iconFontSize: PropTypes.string,
  iconVariant: PropTypes.string,
  inputComponent: PropTypesPlus.component,
  inputComponentProps: PropTypes.shape({}),
  inputType: PropTypes.string,
  margin: PropTypes.string,
  namespace: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  value: PropTypes.bool,
};

WidgetBoolean.defaultProps = {
  containerComponent: undefined,
  containerComponentProps: undefined,
  disabled: undefined,
  hidden: undefined,
  iconComponent: undefined,
  iconComponentProps: undefined,
  iconComponentPropsFalse: undefined,
  iconComponentPropsNull: undefined,
  iconComponentPropsTrue: undefined,
  iconFontSize: undefined,
  iconVariant: undefined,
  inputComponent: undefined,
  inputComponentProps: undefined,
  inputType: undefined,
  margin: undefined,
  namespace: 'component_widgetBoolean',
  onChange: undefined,
  readOnly: undefined,
  value: undefined,
};

export default WidgetBoolean;
