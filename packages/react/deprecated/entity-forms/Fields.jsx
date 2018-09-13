import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { Map, is } from 'immutable';

import { PropTypesEntities } from 'lib/react-entities';

import withFieldProps from './withFieldProps';

class Fields extends React.Component {
  constructor(props) {
    super(props);

    this.genWidgetProps = this.genWidgetProps.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !is(this.props.fieldProps, nextProps.fieldProps)
      || this.props.fieldNames.some(
        fieldName => !is(
          this.props.record.get(fieldName),
          nextProps.record.get(fieldName),
        ),
      )
      || !is(
        Map(this.props.entity.genWidgetProps(this.props)),
        Map(nextProps.entity.genWidgetProps(nextProps)),
      );
  }

  genWidgetProps() {
    return {
      name: this.props.name,
      value: this.props.record.filter((_, key) => this.props.fieldNames.includes(key)),
      record: this.props.record,
      onChange: this.props.onChange,
      fields: this.props.fields,
      ...this.entity.genWidgetProps(this.props),
      ...this.props.fieldProps.toJS(),
    };
  }

  render() {
    const Widget = this.props.component || this.props.entity.genWidget(this.props);

    if (process.env.NODE_ENV !== 'production') {
      if (!Widget) {
        throw new Error(`react-forms(FieldComputed): ${this.props.name} - Unable to generate Widget!`);
      }
    }

    return <Widget {...this.genWidgetProps()} />;
  }
}

Fields.propTypes = {
  name: PropTypes.string.isRequired,
  record: PropTypesImmutable.map.isRequired,
  onChange: PropTypes.func.isRequired,
  fields: PropTypes.objectOf(PropTypesEntities.field).isRequired,
  entity: PropTypesEntities.entity.isRequired,
  fieldNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  fieldProps: PropTypesImmutable.map.isRequired,
  formName: PropTypes.string.isRequired,
  formProps: PropTypesImmutable.map.isRequired,
  component: PropTypes.func,
};

Fields.defaultProps = {
  component: null,
};

export default withFieldProps(Fields);
