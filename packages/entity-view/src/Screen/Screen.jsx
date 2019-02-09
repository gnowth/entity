import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useDefault } from '@gnowth/default';
import { UIWell } from '@gnowth/ui';

const mapDefault = {
  queryComponent: ['entityView_query', 'component_query'],
};

const ViewScreen = (props) => {
  const Component = props.component;
  const Defaults = useDefault(mapDefault, props);

  return (
    <Component ratio={props.ratio} variant={props.variant}>
      <Defaults.queryComponent {...props.queryComponentProps} />
    </Component>
  );
};

ViewScreen.propTypes = {
  component: PropTypesPlus.component,
  queryComponent: PropTypesPlus.component,
  queryComponentProps: PropTypes.shape({
    action: PropTypesPlus.action.isRequired,
    component: PropTypesPlus.component.isRequired,
  }).isRequired,
  ratio: PropTypes.number,
  variant: PropTypes.string,
};

ViewScreen.defaultProps = {
  component: UIWell,
  queryComponent: undefined,
  ratio: 2,
  variant: 'page',
};

export default React.memo(ViewScreen);
