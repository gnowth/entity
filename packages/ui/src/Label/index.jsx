import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import UIError from '../Error';
import UITooltip from '../Tooltip';
import UITypeSet from '../TypeSet';

import { Label, UILabelRoot } from './styles';

// TODO use locale? but we are not using children here? reconsider for this one?
// TODO error need to have a key?
const UILabel = props => (
  <UILabelRoot className={props.className} css={props.css}>
    { props.label && (
      <Label>{ props.label }</Label>
    )}

    { !props.label && props.labelLocale && (
      <UITypeSet
        component={Label}
        locale={props.labelLocale}
        variant="label"
      />
    )}

    { (props.label || props.labelLocale) && props.errors && props.errors.size > 0 && (
      <UITooltip componentProps={{ name: 'error' }}>
        { props.errors.map((error, index) => ( // TODO remove eslint disable
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
  labelLocale: PropTypesPlus.locale,
};

UILabel.defaultProps = {
  children: undefined,
  css: undefined,
  errors: undefined,
  label: undefined,
  labelLocale: undefined,
};

export default UILabel;
