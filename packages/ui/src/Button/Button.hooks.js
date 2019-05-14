import classnames from 'classnames';
import idx from 'idx';
import { useDefault } from '@burnsred/default';
import { useCleanProps } from '@burnsred/theme';

import UIIcon from '../Icon';
import UIProgressCircle from '../ProgressCircle';
import UIType from '../Type';

const local = [
  'contentPaletteAsBackground',
  'iconCss',
  'iconFont',
  'iconHidden',
  'iconName',
  'iconPaletteAsBackground',
  'processingPaletteAsBackground',
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
        css: props.iconCss,
        fontSize: props.iconFontSize,
        hidden: props.processing || props.iconHidden === undefined || props.iconHidden,
        name: props.iconName || 'name',
        palette: props.$palette,
        paletteAsBackground: props.iconPaletteAsBackground,
        paletteWeight: props.$paletteWeight,
        variant: 'button',
      },

      props.iconFont && {
        [props.iconFont]: true,
      },

      props.iconComponentProps,

      {
        className: classnames('uiButton-Icon', idx(props, x => x.iconComponentProps.className)),
      },
    );
  },

  usePropsContent(props) {
    return {
      children: props.children,
      hidden: props.contentHidden || props.processing,
      palette: props.$palette,
      paletteAsBackground: props.contentPaletteAsBackground,
      paletteWeight: props.$paletteWeight,
      value: props.content,
      variant: 'button',
      ...props.contentComponentProps,
      className: classnames('uiButton-Content', idx(props, x => x.contentComponentProps.className)),
    };
  },

  usePropsProcessing(props) {
    return {
      hidden: !props.processing,
      palette: props.$palette,
      paletteAsBackground: props.processingPaletteAsBackground,
      paletteWeight: props.$paletteWeight,
      variant: 'button',
      ...props.processingComponentProps,
    };
  },
};
