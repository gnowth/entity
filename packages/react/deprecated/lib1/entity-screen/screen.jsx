import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { PropTypesEntity } from 'lib/entity';

import { Provider } from './context';

class Screen extends React.Component {
  handleChange = ({ target: { value, name, names } }) => {
    this.props.state.set(name, value);

    this.props.entity.clean(value);
    this.props.setState();
  }

  render() {
    return (
      <section>
        <Provider
          onChange={this.handleChange}
          record={this.props.state}
          entity={this.props.entity}
        >
          { this.props.children }
        </Provider>
      </section>
    );
  }
}

Screen.propTypes = {
  state: PropTypesImmutable.map.isRequired,
  setState: PropTypes.func.isRequired,
  entity: PropTypesEntity.entity.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const mapStateToProps = (state, props) => ({
  state: props.entity.duck.getState(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  setState: state => dispatch(props.entity.duck.setState(state)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen);


// TOADD Submit, Errors, Reset
// class Form extends React.Component {
//   handleChange = ({ target: { name, value } }) => {
//     const newValue = this.props.state.set(name, value); // TODO set new value base on spec
//     const nextValue = this.props.stateWillChange({
//       value: this.props.state,
//       nextValue: newValue,
//       record: this.props.record,
//     });

//     this.props.onChange({
//       target: {
//         name: this.props.name,
//         value: nextValue,
//       },
//     });
//   }

//   // TODO remove and improve, temporary for testing?
//   handleRecordChange = ({ target: { value } }) => {
//     const nextValue = this.props.stateWillChange({
//       value: this.props.state,
//       nextValue: value,
//       record: this.props.record,
//     });

//     this.props.onChange({
//       target: {
//         name: this.props.name,
//         value: nextValue,
//       },
//     });
//   }

//   render() {
//     const Component = this.props.nested === 'true' ? 'fieldset' : 'form';

//     return (
//       <Component className={this.props.className}>
//         <Provider
//           value={{
//             record: this.props.state,
//             field: this.props.field,
//             onChange: this.handleChange,
//             onRecordChange: this.handleRecordChange,
//             errors: Map(),
//           }}
//         >
//           {this.props.children}
//         </Provider>
//       </Component>
//     );
//   }
// }

// Form.propTypes = {
//   name: PropTypes.string,
//   value: PropTypesImmutable.map.isRequired,
//   record: PropTypesImmutable.map,
//   onChange: PropTypes.func.isRequired,

//   // entity: PropTypes.object.isRequired,

//   nested: PropTypes.string,
//   valueWillChange: PropTypes.func,

//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
// };

// Form.defaultProps = {
//   name: undefined,
//   record: undefined,
//   nested: 'false',
//   valueWillChange: ({ nextValue }) => nextValue,
// };

// export default Form;
