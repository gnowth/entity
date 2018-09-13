import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

export default function ({ renameName = 'name', renameValue = 'value', renameOnChange = 'onChange', renameHandleNestedChange = 'handleNestedChange' } = {}) {
  return ComposedComponent => class withHandleChangeNested extends React.Component {
    static propTypes = {
      [renameName]: PropTypes.string.isRequired,
      [renameValue]: PropTypesImmutable.map.isRequired,
      [renameOnChange]: PropTypes.func.isRequired,
    };

    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ target: { name: inputName, value: inputValue } }) {
      return this.props[renameOnChange]({
        target: {
          name: this.props[renameName],
          value: inputName
            ? this.props[renameValue].set(inputName, inputValue)
            : this.props[renameValue].merge(inputValue),
        },
      });
    }

    render() {
      const props = Object.assign({}, this.props, {
        [renameHandleNestedChange]: this.handleChange,
      });

      return <ComposedComponent {...props} />;
    }
  };
}
