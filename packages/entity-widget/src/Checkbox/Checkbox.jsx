import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { withPropsFiltered } from '@gnowth/higher-order-component';
import { component } from '@gnowth/style';

const Input = styled.input`
  display: block;
  cursor: pointer;
  width: 14px;

  ${component({ branch: 'css' })}
  ${props => props.css}
`;

class WidgetCheckbox extends React.Component {
  ref = React.createRef()

  handleChange = () => this.props.onChange({
    target: {
      index: this.props.index,
      name: this.props.name,
      value: !this.props.value,
    },
  })

  componentDidMount() {
    if (this.component) {
      this.ref.current.indeterminate = this.props.value === null;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.ref.current.indeterminate = this.props.value === null;
    }
  }

  render() {
    return (
      <Input
        {...this.props}
        type="checkbox"
        checked={!!this.props.value}
        onChange={this.handleChange}
        ref={this.ref}
      />
    );
  }
}

WidgetCheckbox.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string.isRequired,
  namespace: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool,
  variant: PropTypes.string,
};

WidgetCheckbox.defaultProps = {
  index: undefined,
  namespace: 'component_widgetCheckbox',
  value: false,
  variant: 'standard',
};

export default withPropsFiltered(WidgetCheckbox);
