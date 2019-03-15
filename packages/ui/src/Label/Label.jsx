import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useEnhanceProps } from '@gnowth/theme';

import UIError from '../Error';
import UITooltip from '../Tooltip';
import UIType from '../Type';

import hooks from './Label.hooks';
import styles, { Label, UILabelRoot } from './Label.styles';

function UILabel(_props) {
  const props = useEnhanceProps(_props, { hooks, styles });
  const propsTooltip = props.hooks.usePropsTooltip(props, props.styles);

  return (
    <UILabelRoot
      className={props.className}
      css={props.css}
      $margin={props.$margin} // eslint-disable-line react/prop-types
    >
      { props.label && (
        <UIType
          as={Label}
          palette={props.labelComponentPalette}
          variant={props.labelComponentVariant || 'label'}
          value={props.label}
          {...props.labelComponentProps}
        />
      )}

      { props.label && !props.errorComponentHidden && props.inputProps.errors && props.inputProps.errors.size > 0 && (
        <UITooltip {...propsTooltip}>
          { props.inputProps.errors.map((error, index) => (
            <UIError key={index}>{ error }</UIError> // eslint-disable-line
          ))}
        </UITooltip>
      )}

      { props.children }
    </UILabelRoot>
  );
}

UILabel.propTypes = {
  children: PropTypes.node,
  css: PropTypesPlus.css,
  errorComponentHidden: PropTypes.bool,
  hooks: PropTypes.exact({
    usePropsTooltip: PropTypes.func,
  }),
  inputProps: PropTypes.shape({
    errors: PropTypesImmutable.list,
  }).isRequired,
  label: PropTypesPlus.typography,
  labelComponentPalette: PropTypes.string,
  labelComponentProps: PropTypes.shape({}),
  labelComponentVariant: PropTypes.string,
  margin: PropTypes.string,
  namespace: PropTypesPlus.string,
  styles: PropTypes.exact({
    icon: PropTypesPlus.css,
    tooltip: PropTypesPlus.css,
  }),
};

UILabel.defaultProps = {
  children: undefined,
  css: undefined,
  errorComponentHidden: undefined,
  hooks: undefined,
  label: undefined,
  labelComponentPalette: undefined,
  labelComponentProps: {},
  labelComponentVariant: undefined,
  margin: undefined,
  namespace: 'component_uiLabel',
  styles: undefined,
};

export default React.memo(UILabel);
