import _flowRight from 'lodash/flowRight';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { withDefault } from '@gnowth/default';
import { withProps } from '@gnowth/higher-order-component';

const Screen = styled.div`
  background-color: white;
  border-radius: 1rem;
  margin-top: 0.5rem;
  padding: 2rem;

  ${props => props.theme.components?.viewScreen?.[props.variant || 'default']}
  ${props => props.css}
`;

const ViewScreen = ({ component: Component, ...props }) => (
  <Component>
    <props.viewScreen_QueryComponent {...props.queryComponentProps} />
  </Component>
);

ViewScreen.propTypes = {
  component: PropTypesPlus.component,
  queryComponentProps: PropTypes.shape({
    action: PropTypes.func.isRequired,
    component: PropTypesPlus.component.isRequired,
  }).isRequired,
  viewScreen_QueryComponent: PropTypesPlus.component.isRequired,
};

ViewScreen.defaultProps = {
  component: Screen,
};

export default _flowRight(
  withDefault(),
  withProps(props => ({
    viewScreen_QueryComponent: props.queryComponent || props.defaults.query,
  })),
)(ViewScreen);
