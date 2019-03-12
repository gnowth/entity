import classnames from 'classnames';
import { useDefault } from '@gnowth/default';
import { useCleanProps } from '@gnowth/theme';

import UIIcon from '../Icon';
import UIProgressCircle from '../ProgressCircle';
import UIType from '../Type';

const local = [
  'contentComponentPaletteAsBackground',
  'iconComponentCss',
  'iconComponentFont',
  'iconComponentHidden',
  'iconComponentName',
  'iconComponentPaletteAsBackground',
  'processingComponentPaletteAsBackground',
];

const mapDefault = {
  contentComponent: ['uiButton_component_type', 'component_type'],
  iconComponent: ['uiButton_component_icon', 'component_icon'],
  linkComponent: ['uiButton_component_link', 'component_link'],
  processingComponent: ['uiButton_component_processing', 'component_processing'],
};

export default {
  useComponents(props) {
    const defaults = useDefault(mapDefault, props);

    return {
      Content: defaults.contentComponent || UIType,
      Icon: defaults.iconComponent || UIIcon,
      Processing: defaults.processingComponent || UIProgressCircle,
    };
  },

  useProps(props) {
    const { linkComponent } = useDefault(mapDefault, props);

    return useCleanProps(Object.assign(
      { href: props.to },

      props,

      props.to && {
        as: props.as || (!/^https?:\/\//.exec(props.to) && linkComponent) || 'a',
      },

      {
        disabled: props.processing || props.disabled,
      },
    ), { local });
  },

  usePropsIcon(props) {
    return Object.assign(
      {
        css: props.iconComponentCss,
        hidden: props.processing || props.iconComponentHidden === undefined || props.iconComponentHidden,
        name: props.iconComponentName || 'name',
        palette: props.$palette,
        paletteAsBackground: props.iconComponentPaletteAsBackground,
        paletteWeight: props.$paletteWeight,
        variant: 'button',
      },

      props.iconComponentFont && {
        [props.iconComponentFont]: true,
      },

      props.iconComponentProps,

      {
        className: classnames('uiButton-Icon', props.iconComponentProps?.className),
      },
    );
  },

  usePropsContent(props) {
    return {
      children: props.children,
      hidden: props.contentComponentHidden || props.processing,
      palette: props.$palette,
      paletteAsBackground: props.contentComponentPaletteAsBackground,
      paletteWeight: props.$paletteWeight,
      value: props.content,
      variant: 'button',
      ...props.contentComponentProps,
      className: classnames('uiButton-Content', props.contentComponentProps?.className),
    };
  },

  usePropsProcessing(props) {
    return {
      hidden: !props.processing,
      palette: props.$palette,
      paletteAsBackground: props.processingComponentPaletteAsBackground,
      paletteWeight: props.$paletteWeight,
      variant: 'button',
      ...props.processingComponentProps,
    };
  },
};
