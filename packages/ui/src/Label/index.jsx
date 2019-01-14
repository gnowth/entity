import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import UIError from '../Error';
import UITooltip from '../Tooltip';
import UITypeSet from '../TypeSet';

import styles, { Label, UILabelRoot } from './styles';

const UILabel = props => (
  <UILabelRoot className={props.className} css={props.css}>
    { (props.label || props.labelLocale) && (
      <UITypeSet
        component={Label}
        locale={props.labelLocale}
        variant="label"
        {...props.labelComponentProps}
      >
        { props.label }
      </UITypeSet>
    )}

    { (props.label || props.labelLocale) && props.errors && props.errors.size > 0 && (
      <UITooltip
        componentProps={{
          css: props.styles.icon,
          name: 'error',
          material: true,
        }}
        css={props.styles.tooltip}
      >
        { props.errors.map((error, index) => (
          <UIError key={index}>{ error }</UIError> // eslint-disable-line
        ))}
      </UITooltip>
    )}

    { props.children }
  </UILabelRoot>
);

UILabel.propTypes = {
  children: PropTypes.node,
  css: PropTypesPlus.css,
  errors: PropTypesImmutable.list,
  label: PropTypes.string,
  labelComponentProps: PropTypes.shape({}),
  labelLocale: PropTypesPlus.locale,
  styles: PropTypes.exact({
    icon: PropTypesPlus.css,
    tooltip: PropTypesPlus.css,
  }),
};

UILabel.defaultProps = {
  styles,
  children: undefined,
  css: undefined,
  errors: undefined,
  label: undefined,
  labelComponentProps: {},
  labelLocale: undefined,
};

export default UILabel;
