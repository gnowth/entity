import React from 'react';

export default {
  useHandleIndeterminate(props, configs) {
    if (configs.ref.current) {
      configs.ref.current.indeterminate = props.value === null; // eslint-disable-line no-param-reassign
    }
  },

  usePropsContainer(props) {
    return {
      as: props.iconComponent,
      className: props.className,
      css: props.css,
      hidden: props.hidden,
      $margin: props.$margin,
      ...props.containerComponentProps,
    };
  },

  usePropsIcon(props) {
    return Object.assign(
      {
        as: props.iconComponent,
        fontSize: props.iconFontSize,
        material: true,
        palette: props.$palette,
        paletteAsBackground: props.$paletteAsBackground,
        paletteWeight: props.$paletteWeight,
        variant: props.iconVariant,
      },

      props.iconComponentProps,

      props.value === null && {
        name: 'indeterminate_check_box',
      },

      props.value === null
        && props.iconComponentPropsNull,

      props.value && {
        name: 'check_box',
      },

      props.value
        && props.iconComponentPropsTrue,

      (props.value === false || props.value === undefined) && {
        name: 'check_box_outline_blank',
      },

      (props.value === false || props.value === undefined)
        && props.iconComponentPropsFalse,
    );
  },

  usePropsInput(props) {
    const handleChange = React.useCallback(
      () => props.onChange && props.onChange({
        target: {
          index: props.index,
          name: props.name,
          value: !props.value,
        },
      }),
      [props.index, props.onChange, props.value],
    );

    return {
      as: props.inputComponent,
      checked: !!props.value,
      disabled: props.disabled,
      onChange: handleChange,
      readOnly: props.readOnly,
      type: props.inputType || 'checkbox',
      value: props.value,
      ...props.inputComponentProps,
    };
  },
};
