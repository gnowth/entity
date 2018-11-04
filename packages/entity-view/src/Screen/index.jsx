import _flowRight from 'lodash/flowRight';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { withDefault } from '@gnowth/default';
import { withProps } from '@gnowth/higher-order-component';
import { UIWell } from '@gnowth/ui';

const ViewScreen = ({ component: Component, ...props }) => (
  <Component ratio={props.ratio} variant={props.variant}>
    <props.viewScreen_QueryComponent {...props.queryComponentProps} />
  </Component>
);

ViewScreen.propTypes = {
  component: PropTypesPlus.component,
  queryComponentProps: PropTypes.shape({
    action: PropTypes.func.isRequired,
    component: PropTypesPlus.component.isRequired,
  }).isRequired,
  ratio: PropTypes.number,
  variant: PropTypes.string,
  viewScreen_QueryComponent: PropTypesPlus.component.isRequired,
};

ViewScreen.defaultProps = {
  component: UIWell,
  ratio: 2,
  variant: 'page',
};

export default _flowRight(
  withDefault(),
  withProps(props => ({
    viewScreen_QueryComponent: props.queryComponent || props.defaults.query,
  })),
)(ViewScreen);
