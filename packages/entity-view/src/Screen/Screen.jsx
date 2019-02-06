import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useDefault } from '@gnowth/default';
import { UIWell } from '@gnowth/ui';

const mapDefaultToProps = {
  QueryComponent: ['entityView_query', 'component_query'],
};

const ViewScreen = (props) => {
  const Component = props.component;
  const { QueryComponent } = useDefault(props, mapDefaultToProps);

  return (
    <Component ratio={props.ratio} variant={props.variant}>
      <QueryComponent {...props.queryComponentProps} />
    </Component>
  );
};

ViewScreen.propTypes = {
  component: PropTypesPlus.component,
  queryComponentProps: PropTypes.shape({
    action: PropTypes.func.isRequired,
    component: PropTypesPlus.component.isRequired,
  }).isRequired,
  ratio: PropTypes.number,
  variant: PropTypes.string,
  QueryComponent: PropTypesPlus.component,
};

ViewScreen.defaultProps = {
  component: UIWell,
  ratio: 2,
  variant: 'page',
  QueryComponent: undefined,
};

export default React.memo(ViewScreen);
