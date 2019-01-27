import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { withDefault } from '@gnowth/default';
import { UIWell } from '@gnowth/ui';

const ViewScreen = (props) => {
  const Component = props.component;
  const QueryComponent = props.queryComponent;

  return (
    <Component ratio={props.ratio} variant={props.variant}>
      <QueryComponent {...props.queryComponentProps} />
    </Component>
  );
};

ViewScreen.propTypes = {
  component: PropTypesPlus.component,
  queryComponent: PropTypesPlus.component.isRequired,
  queryComponentProps: PropTypes.shape({
    action: PropTypes.func.isRequired,
    component: PropTypesPlus.component.isRequired,
  }).isRequired,
  ratio: PropTypes.number,
  variant: PropTypes.string,
};

ViewScreen.defaultProps = {
  component: UIWell,
  ratio: 2,
  variant: 'page',
};

export default withDefault({
  queryComponent: ['entityView_query', 'component_query'],
})(ViewScreen);
