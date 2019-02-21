import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useEnhance } from '@private/hooks';

import hooks from './Button.hooks';
import Button from './Button.styles';

function UIButton(originalProps) {
  const props = useEnhance(originalProps, { hooks });
  const { Content, Icon, Processing } = props.hooks.useComponents(props);

  return (
    <Button {...props.hooks.useProps(props)}>
      <Icon {...props.hooks.usePropsIcon(props)} />

      <Processing {...props.hooks.usePropsProcessing(props)} />

      <Content {...props.hooks.usePropsContent(props)} />
    </Button>
  );
}

UIButton.propTypes = {
  children: PropTypes.node,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypesPlus.locale,
    PropTypesImmutable.map,
  ]),
  contentComponent: PropTypesPlus.component,
  contentComponentHidden: PropTypes.bool,
  contentComponentPaletteAsBackground: PropTypes.bool,
  contentComponentProps: PropTypes.shape({}),
  hidden: PropTypes.bool,
  hooks: PropTypes.exact({
    useComponents: PropTypes.func,
    useProps: PropTypes.func,
    usePropsContent: PropTypes.func,
    usePropsIcon: PropTypes.func,
    usePropsProcessing: PropTypes.func,
  }),
  iconComponent: PropTypesPlus.component,
  iconComponentCss: PropTypesPlus.css,
  iconComponentFont: PropTypesPlus.string,
  iconComponentHidden: PropTypes.bool,
  iconComponentName: PropTypesPlus.string,
  iconComponentPaletteAsBackground: PropTypes.bool,
  iconComponentProps: PropTypes.shape({}),
  media: PropTypesPlus.string,
  mediaPrintDisabled: PropTypes.bool,
  namespace: PropTypesPlus.string,
  palette: PropTypesPlus.string,
  paletteWeight: PropTypes.string,
  processing: PropTypes.bool,
  processingComponent: PropTypesPlus.component,
  processingComponentPaletteAsBackground: PropTypes.bool,
  processingComponentProps: PropTypes.shape({}),
  variant: PropTypesPlus.string,
};

UIButton.defaultProps = {
  children: undefined,
  content: undefined,
  contentComponent: undefined,
  contentComponentHidden: undefined,
  contentComponentPaletteAsBackground: undefined,
  contentComponentProps: undefined,
  hidden: undefined,
  hooks: undefined,
  iconComponent: undefined,
  iconComponentCss: undefined,
  iconComponentFont: undefined,
  iconComponentHidden: undefined,
  iconComponentName: undefined,
  iconComponentPaletteAsBackground: undefined,
  iconComponentProps: undefined,
  media: undefined,
  mediaPrintDisabled: undefined,
  namespace: 'component_uiButton',
  palette: undefined,
  paletteWeight: undefined,
  processing: undefined,
  processingComponent: undefined,
  processingComponentPaletteAsBackground: undefined,
  processingComponentProps: undefined,
  variant: 'standard',
};

export default React.memo(UIButton);
