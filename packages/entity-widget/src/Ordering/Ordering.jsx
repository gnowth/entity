import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import { component } from '@burnsred/theme';
import { UIIcon } from '@burnsred/ui';
import { List } from 'immutable';

class WidgetOrdering extends React.Component {
  nameMap = {
    ascending: 'arrow_upward',
    descending: 'arrow_downward',
    random: 'unfold_more',
  };

  handleClick = () => {
    const state = this.getOrderingState();

    let value = '';
    switch (state) {
      case 'ascending':
        value = `-${this.props.orderingKey}`;
        break;

      case 'descending':
        value = this.props.field.blank || (this.props.field.many && this.props.value.size !== 1)
          ? ''
          : this.props.orderingKey;
        break;

      default:
        value = this.props.orderingKey;
    }

    if (this.props.field.many) {
      const valueCleared = this.props.value
        .filterNot(v => v === this.props.orderingKey)
        .filterNot(v => v === `-${this.props.orderingKey}`);

      value = value
        ? valueCleared.unshift(value)
        : valueCleared;
    }

    return this.props.onChange({
      target: {
        name: this.props.name,
        value,
      },
    });
  };

  handleKeyPress = () => {}

  getOrderingState() {
    const value = this.props.field.many
      ? this.props.value
      : List(this.props.value ? [this.props.value] : []);

    if (value.includes(this.props.orderingKey)) return 'ascending';

    if (value.includes(`-${this.props.orderingKey}`)) return 'descending';

    return 'random';
  }

  render() {
    return (
      <span
        className={this.props.className}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        role="button"
        tabIndex={0}
      >
        { this.props.label }
        <UIIcon
          css={css`
            ${component({ namespace: 'component_widgetOrdering', branch: 'icon' })}
          `}
          material
          name={this.nameMap[this.getOrderingState()]}
          {...this.props.iconComponentProps}
        />
      </span>
    );
  }
}

WidgetOrdering.propTypes = {
  field: PropTypesEntity.field.isRequired,
  iconComponentProps: PropTypes.shape({}),
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  orderingKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypesImmutable.list,
  ]).isRequired,
};

WidgetOrdering.defaultProps = {
  iconComponentProps: undefined,
};

export default styled(WidgetOrdering)`
  ${component({ namespace: 'component_widgetOrdering', branch: 'root' })}
  ${props => props.css}
`;
