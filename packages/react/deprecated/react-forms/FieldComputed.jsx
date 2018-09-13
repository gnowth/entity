import React from 'react';
import PropTypes from 'prop-types';

class FieldComputed extends React.Component {
  constructor(props) {
    super(props);
    this.s = 1;
  }

  render() {
    const field = this.props.field || this.props.form_field;
    const Component = field.entity.getWidget(this.props);
    const widgetProps = field.entity.getWidgetProps(this.props);

    const props = Object.assign({}, widgetProps, {
      value: this.selector(this.props),
    });

    return (
      <Component {...props} />
    );
  }
}

FieldComputed.propTypes = {
  form_field: PropTypes.shape({}).isRequired,
  field: PropTypes.shape({}),
};

FieldComputed.defaultProps = {
  field: null,
};

export default FieldComputed;
