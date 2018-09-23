import PropTypes from 'prop-types';
import React from 'react';

import PropTypesPlus from 'lib/prop-types/Plus';
import PropTypesLocale from 'lib/prop-types/Locale';
import UITypeSet from 'lib/ui/TypeSet';

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

  label: PropTypes.oneOfType([
    PropTypes.string,
  ]),

  labelLocale: PropTypesPlus.isRequiredIfNot(
    'label',
    PropTypesLocale.locale,
  ),
};

UILabel.defaultProps = {
  children: undefined,
  label: undefined,
  labelLocale: undefined,
};

export default UILabel;
