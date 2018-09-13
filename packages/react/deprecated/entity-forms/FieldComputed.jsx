import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { Map, is } from 'immutable';

import { PropTypesEntities } from 'lib/react-entities';

import withFieldProps from './withFieldProps';

// TODO add validators and errors
class FieldComputed extends React.Component {
  constructor(props) {
    super(props);

    this.selector = props.selector();
    this.genWidgetProps = this.genWidgetProps.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (process.env.NODE_ENV !== 'production') {
      if (nextProps.selector !== this.props.selector) {
        throw new Error(`entity-forms(FieldComputed): ${this.props.name} - no dynamic support for 'selector' option!`);
      }
    }
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
    const fieldProps = Object.assign(
      this.props.entity.genWidgetProps(this.props),
      this.props.fieldProps.toJS(),
    );

    return {
      name: this.props.name,
      value: this.selector(this.props.record, fieldProps),
      record: this.props.record,
      fields: this.props.fields,
      ...fieldProps,
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

FieldComputed.propTypes = {
  name: PropTypes.string.isRequired,
  record: PropTypesImmutable.map.isRequired,
  selector: PropTypes.func.isRequired,
  fields: PropTypes.objectOf(PropTypesEntities.field).isRequired,
  entity: PropTypesEntities.entity.isRequired,
  fieldNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  fieldProps: PropTypesImmutable.map.isRequired,
  formName: PropTypes.string,
  formProps: PropTypesImmutable.map.isRequired,
  component: PropTypes.func,
};

FieldComputed.defaultProps = {
  formName: '',
  component: null,
};

export default withFieldProps(FieldComputed);
