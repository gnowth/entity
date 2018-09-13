import _omit from 'lodash/omit';
import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

import { PropTypesEntity } from 'lib/react-entities';

import SC from './styles';

export default function ({ renameOnChange = 'onChange' } = {}) {
  return ComposeComponent => class withController extends React.Component {
    static propTypes = {
      name: PropTypes.string.isRequired,
      value: PropTypesImmutable.map.isRequired,
      field: PropTypesEntity.field,
      onChange: PropTypes.func.isRequired,
      asFieldSet: PropTypes.bool,
    };

    static defaultProps = {
      asFieldSet: false,
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

      const nextValue = this.props.field.entity.valueWillChange({
        value: this.props.value,
        nextValue: target.value,
        formProps: _omit(this.props, ['name', 'value', 'field', 'onSubmit', 'onChange', 'children']),
      });

      return this.props.onChange({ target: { name: target.name, value: nextValue } });
    }

    render() {
      const component = this.props.asFieldSet ? SC.FieldSet : SC.Form;
      const props = Object.assign({}, this.props, {
        component,
        [renameOnChange]: this.handleChange,
      });

      return <ComposeComponent {...props} />;
    }
  };
}
