import _ from 'lodash';
import React from 'react';
import PropTypesPlus from '@burnsred/prop-types-plus';
import PropTypes from 'prop-types';
import { UIType } from '@burnsred/ui';

import { Consumer } from './base';

class Column extends React.Component {
  renderAsChildren(props) {
    return this.props.children(props);
  }

  renderAsComponent(props) {
    const Component = this.props.component;
    const WrapperComponent = this.props.wrapperComponent;

    return (
      <WrapperComponent>
        <Component
          {...props}
          className={this.props.className}
          value={this.props.renderValue(props)}
          {...Object.assign(
            Component === UIType
              ? {
                name: 'table_text',
                component: 'td',
                childrenFromValue: true,
              }
              : {},
            _.isFunction(this.props.componentProps)
              ? this.props.componentProps(props)
              : this.props.componentProps,
          )}
        />
      </WrapperComponent>
    );
  }

  render() {
    if (this.props.hidden) return null;

    return (
      <Consumer>
        { (context) => {
          const props = this.props.name
            ? {
              name: this.props.name,
              value: context.field.getValue(context.value, { name: this.props.name }),
              record: context.value,
              field: Array.isArray(this.props.name)
                ? context.field
                : context.field.entity.fields[this.props.name],
            }
            : context;

          return this.props.children
            ? this.renderAsChildren(props)
            : this.renderAsComponent(props);
        }}
      </Consumer>
    );
  }
}

Column.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  children: PropTypesPlus.isRequiredIfNot('component', PropTypes.func),

  label: PropTypes.node,
  hidden: PropTypes.bool,

  // component
  componentProps: PropTypesPlus.componentProps,
  component: PropTypesPlus.component,
  wrapperComponent: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
    PropTypes.symbol.isRequired,
  ]),

  renderValue: PropTypes.func,
};

Column.defaultProps = {
  name: undefined,
  component: UIType,
  componentProps: {},
  hidden: false,
  label: '',
  children: undefined,

  wrapperComponent: React.Fragment,

  renderValue: ({ value }) => value,
};

export default Column;
