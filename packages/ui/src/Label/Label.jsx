import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useEnhanceProps } from '@gnowth/style';


import UIError from '../Error';
import UITooltip from '../Tooltip';
import UIType from '../Type';

import hooks from './Label.hooks';
import styles, { Label, UILabelRoot } from './Label.styles';

function UILabel(_props) {
  const props = useEnhanceProps(_props, { hooks, styles });
  const propsTooltip = props.hooks.usePropsTooltip(props, props.styles);

  return (
    <UILabelRoot className={props.className} css={props.css}>
      { props.label && (
        <UIType
          as={Label}
          variant="label"
          value={props.label}
          {...props.labelComponentProps}
        />
      )}

      { props.label && props.errors && props.errors.size > 0 && (
        <UITooltip {...propsTooltip}>
          { props.errors.map((error, index) => (
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
  errors: PropTypesImmutable.list,
  hooks: PropTypes.exact({
    usePropsTooltip: PropTypes.func,
  }),
  label: PropTypesPlus.typography,
  labelComponentProps: PropTypes.shape({}),
  styles: PropTypes.exact({
    icon: PropTypesPlus.css,
    tooltip: PropTypesPlus.css,
  }),
};

UILabel.defaultProps = {
  children: undefined,
  css: undefined,
  errors: undefined,
  hooks: undefined,
  label: undefined,
  labelComponentProps: {},
  styles: undefined,
};

export default React.memo(UILabel);
