import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useDefault } from '@gnowth/default';

import useInput from './use-input';

const mapDefault = {
  popupComponent: ['entityForm_popup', 'component_popup'],
};

function PopupShadowInner({ popupComponent, ...props }) {
  const Defaults = useDefault(mapDefault, { popupComponent });
  const input = useInput();
  const handleClose = React.useCallback(
    () => {
      input.onChange({
        target: {
          name: input.name,
          value: input.valueInitial,
        },
      });
      props.onClose();
    },
    [props.onClose, input],
  );

  return (
    <Defaults.popupComponent
      {...props}
      componentProps={{
        ...input,
        ...props.componentProps,
      }}
      onClose={handleClose}
    />
  );
}

PopupShadowInner.propTypes = {
  component: PropTypesPlus.component.isRequired,
  componentProps: PropTypes.shape({}),
  containerComponent: PropTypesPlus.component,
  containerComponentProps: PropTypes.shape({}),
  controlComponent: PropTypesPlus.component,
  controlComponentProps: PropTypes.shape({}),
  event: PropTypesPlus.string,
  hooks: PropTypes.exact({
    useComponents: PropTypes.func,
    useGetPropsComponent: PropTypes.func,
    useGetPropsContainer: PropTypes.func,
    useGetPropsControl: PropTypes.func,
    useGetPropsWrapper: PropTypes.func,
  }),
  onClose: PropTypes.func,
  popupComponent: PropTypesPlus.component,
  type: PropTypesPlus.string,
  wrapperComponent: PropTypesPlus.component,
  wrapperComponentProps: PropTypes.shape({}),

  // onclickoutside props
  disableOnClickOutside: PropTypes.func,
  enableOnClickOutside: PropTypes.func,
  eventTypes: PropTypes.arrayOf(PropTypes.string),
  outsideClickIgnoreClass: PropTypes.string,
  preventDefault: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  wrappedRef: PropTypes.func,
};

PopupShadowInner.defaultProps = {
  componentProps: {},
  containerComponent: undefined,
  containerComponentProps: {},
  controlComponent: undefined,
  controlComponentProps: {},
  event: 'onClick',
  hooks: undefined,
  onClose: () => undefined,
  popupComponent: undefined,
  type: undefined,
  wrapperComponent: undefined,
  wrapperComponentProps: {},

  // onclickoutside props
  disableOnClickOutside: undefined,
  enableOnClickOutside: undefined,
  eventTypes: undefined,
  outsideClickIgnoreClass: undefined,
  preventDefault: undefined,
  stopPropagation: undefined,
  wrappedRef: undefined,
};

export default React.memo(PopupShadowInner);
