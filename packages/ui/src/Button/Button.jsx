import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { useEnhanceProps } from '@burnsred/theme';

import hooks from './Button.hooks';
import Button from './Button.styles';

function UIButton(_props) {
  const props = useEnhanceProps(_props);
  const { Content, Icon, Processing } = hooks.useComponents(props);
  const processingProps = hooks.usePropsProcessing(props);

  return (
    <Button {...hooks.useProps(props)}>
      <Icon {...hooks.usePropsIcon(props)} />

      { !processingProps.hidden && (
        <Processing {...processingProps} />
      )}

      <Content {...hooks.usePropsContent(props)} />
    </Button>
  );
}

UIButton.propTypes = {
  as: PropTypesPlus.component,
  children: PropTypes.node,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypesPlus.locale,
    PropTypesImmutable.map,
  ]),
  contentComponent: PropTypesPlus.component,
  contentComponentProps: PropTypes.shape({}),
  contentHidden: PropTypes.bool,
  contentPaletteAsBackground: PropTypes.bool,
  css: PropTypesPlus.css,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  iconComponent: PropTypesPlus.component,
  iconComponentProps: PropTypes.shape({}),
  iconCss: PropTypesPlus.css,
  iconFont: PropTypesPlus.string,
  iconHidden: PropTypes.bool,
  iconName: PropTypesPlus.string,
  iconPaletteAsBackground: PropTypes.bool,
  media: PropTypesPlus.string,
  mediaPrintDisabled: PropTypes.bool,
  namespace: PropTypesPlus.string,
  onClick: PropTypes.func,
  palette: PropTypesPlus.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  processing: PropTypes.bool,
  processingComponent: PropTypesPlus.component,
  processingComponentProps: PropTypes.shape({}),
  processingDidFail: PropTypes.bool,
  processingPaletteAsBackground: PropTypes.bool,
  to: PropTypesPlus.string,
  variant: PropTypesPlus.string,
};

UIButton.defaultProps = {
  as: undefined,
  children: undefined,
  content: undefined,
  contentComponent: undefined,
  contentComponentProps: undefined,
  contentHidden: undefined,
  contentPaletteAsBackground: undefined,
  css: undefined,
  disabled: undefined,
  hidden: undefined,
  iconComponent: undefined,
  iconComponentProps: undefined,
  iconCss: undefined,
  iconFont: undefined,
  iconHidden: undefined,
  iconName: undefined,
  iconPaletteAsBackground: undefined,
  media: undefined,
  mediaPrintDisabled: undefined,
  namespace: 'component_uiButton',
  onClick: undefined,
  palette: undefined,
  paletteAsBackground: undefined,
  paletteWeight: undefined,
  processing: undefined,
  processingComponent: undefined,
  processingComponentProps: undefined,
  processingDidFail: undefined,
  processingPaletteAsBackground: undefined,
  to: undefined,
  variant: 'standard',
};

export default React.memo(UIButton);
