import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { Map, is } from 'immutable';

import { PropTypesEntities } from 'lib/react-entities';

import withFieldProps from './withFieldProps';

class Field extends React.Component {
  constructor(props) {
    if (process.env.NODE_ENV !== 'production') {
      if (props.entity.fields[props.name]) {
        throw new Error(`entity-forms(Field) '${props.name}' is not a valid field in Entity '${props.entity.name}'`);
      }
    }

    super(props);

    this.genWidgetProps = this.genWidgetProps.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !is(this.props.fieldProps, nextProps.fieldProps)
      || !is(
        this.props.record.get(this.props.name),
        nextProps.record.get(nextProps.name),
      )
      || !is(
        Map(this.props.entity.genWidgetProps(this.props)),
        Map(nextProps.entity.genWidgetProps(nextProps)),
      );
  }

  genWidgetProps({ isStringWidget }) {
    return Object.assign(
      {
        name: this.props.name,
        value: this.props.record.get(this.props.name),
        onChange: this.props.onChange,
      },
      isStringWidget || {
        record: this.props.record,
        field: this.props.field,
      },
      ...this.entity.genWidgetProps(this.props),
      ...this.props.fieldProps.toJS(),
    );
  }

  render() {
    const Widget = this.props.component || this.props.entity.genWidget(this.props);

    if (process.env.NODE_ENV !== 'production') {
      if (!Widget) {
        throw new Error(`react-forms(Field): ${this.props.name} - Unable to generate Widget!`);
      }
    }

    return <Widget {...this.genWidgetProps({ isStringWidget: typeof Widget === 'string' })} />;
  }
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  record: PropTypesImmutable.map.isRequired,
  onChange: PropTypes.func.isRequired,
  field: PropTypesEntities.field.isRequired,
  entity: PropTypesEntities.entity.isRequired,
  fieldProps: PropTypesImmutable.map.isRequired,
  formName: PropTypes.string,
  formProps: PropTypesImmutable.map.isRequired,
  component: PropTypes.func,
};

Field.defaultProps = {
  formName: '',
  component: null,
};

export default withFieldProps(Field);
