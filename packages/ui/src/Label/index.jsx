import PropTypes from 'prop-types';
import PropTypesLocale from '@gnowth/prop-types-locale';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import UITypeSet from '../TypeSet';
import { Label } from './style';

const UILabel = props => (
  <Label className={props.className}>
    { props.label }

    { !props.label && props.labelLocale && (
      <UITypeSet
        name="label"
        component="span"
        {...props.labelLocale}
      />
    )}

    { props.children }
  </Label>
);

UILabel.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  labelLocale: PropTypesLocale.locale,
};

UILabel.defaultProps = {
  children: undefined,
  label: undefined,
  labelLocale: undefined,
};

export default UILabel;
