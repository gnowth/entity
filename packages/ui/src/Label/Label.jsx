import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useEnhance } from '@private/hooks';

import UIError from '../Error';
import UITooltip from '../Tooltip';
import UIType from '../Type';

import hooks from './Label.hooks';
import styles, { Label, UILabelRoot } from './Label.styles';

function UILabel(props) {
  const enhancedProps = useEnhance(props, { hooks, styles });
  const propsTooltip = enhancedProps.hooks.usePropsTooltip(enhancedProps, enhancedProps.styles);

  return (
    <UILabelRoot className={enhancedProps.className} css={enhancedProps.css}>
      { enhancedProps.label && (
        <UIType
          as={Label}
          variant="label"
          value={enhancedProps.label}
          {...enhancedProps.labelComponentProps}
        />
      )}

      { enhancedProps.label && enhancedProps.errors && enhancedProps.errors.size > 0 && (
        <UITooltip {...propsTooltip}>
          { enhancedProps.errors.map((error, index) => (
            <UIError key={index}>{ error }</UIError> // eslint-disable-line
          ))}
        </UITooltip>
      )}

      { enhancedProps.children }
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
