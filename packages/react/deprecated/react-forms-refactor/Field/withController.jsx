import _omit from 'lodash/omit';
import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

import { PropTypesEntity } from 'lib/react-entities';

export default function ({ renameOnChange = 'onChange' } = {}) {
  return ComposeComponent => class withController extends React.Component {
    static propTypes = {
      name: PropTypes.string.isRequired,
      value: PropTypesImmutable.map.isRequired,
      field: PropTypesEntity.field,
      record: PropTypesImmutable.map.isRequired,
      onChange: PropTypes.func.isRequired,
      formProps: PropTypes.shape({}).isRequired,
    };

    static defaultProps = {
      field: null,
    };

    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ target }) {
      if (!this.props.field) {
        return this.props.onChange({ target });
      }

      // Note: widget changing another field will result in error.
      // Should disable this. maybe in fields. but could have some issues
      const nextValue = this.props.field.valueWillChange({
        value: this.props.value,
        record: this.props.record,
        nextValue: target.value,
        formProps: this.props.formProps,
        fieldProps: _omit(this.props, ['name', 'value', 'field', 'record', 'onChange', 'formProps']),
      });

      return this.props.onChange({ target: { name: target.name, value: nextValue } });
    }

    render() {
      const props = Object.assign({}, this.props, {
        [renameOnChange]: this.handleChange,
      });

      return <ComposeComponent {...props} />;
    }
  };
}
