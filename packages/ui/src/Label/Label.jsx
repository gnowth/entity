import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { useEnhanceProps } from '@burnsred/theme';

import UIError from '../Error';
import UITooltip from '../Tooltip';
import UIType from '../Type';

import hooks from './Label.hooks';
import styles, { Label, UILabelRoot } from './Label.styles';

function UILabel(_props) {
  const props = useEnhanceProps(_props);
  const propsTooltip = hooks.usePropsTooltip(props, styles);

  return (
    <UILabelRoot
      className={props.className}
      css={props.css}
      $margin={props.$margin} // eslint-disable-line react/prop-types
      $marginBottom={props.$marginBottom} // eslint-disable-line react/prop-types
      $marginLeft={props.$marginLeft} // eslint-disable-line react/prop-types
      $marginRight={props.$marginRight} // eslint-disable-line react/prop-types
      $marginTop={props.$marginTop} // eslint-disable-line react/prop-types
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
            <UIError key={index}>{ error }</UIError> // eslint-disable-line react/no-array-index-key
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
  inputProps: PropTypes.shape({
    errors: PropTypesImmutable.list,
  }).isRequired,
  label: PropTypesPlus.typography,
  labelComponentPalette: PropTypes.string,
  labelComponentProps: PropTypes.shape({}),
  labelComponentVariant: PropTypes.string,
  margin: PropTypes.string,
  marginBottom: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  marginTop: PropTypes.string,
  namespace: PropTypesPlus.string,
  variant: PropTypes.string,
};

UILabel.defaultProps = {
  children: undefined,
  css: undefined,
  errorComponentHidden: undefined,
  label: undefined,
  labelComponentPalette: undefined,
  labelComponentProps: {},
  labelComponentVariant: undefined,
  margin: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
  marginRight: undefined,
  marginTop: undefined,
  namespace: 'component_uiLabel',
  variant: 'standard',
};

export default React.memo(UILabel);
