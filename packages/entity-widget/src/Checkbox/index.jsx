import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { withPropsFiltered } from '@gnowth/higher-order-component';

const Input = styled.input`
  display: block;
  cursor: pointer;
  width: 14px;

  ${props => props.theme.components?.widgetCheckbox?.[props.variant]}
  ${props => props.css}
`;

class WidgetCheckbox extends React.Component {
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

  ref = React.createRef()

  handleChange = () => this.props.onChange({
    target: {
      index: this.props.index,
      name: this.props.name,
      value: !this.props.value,
    },
  })

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
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool,
  variant: PropTypes.string,
};

WidgetCheckbox.defaultProps = {
  value: false,
  variant: 'main',
};

export default withPropsFiltered(WidgetCheckbox);
