// import React from 'react';
// import PropTypes from 'prop-types';

// import { Broadcasts } from 'lib/react-broadcasts';

// // todo form name could leak in field
// class Form extends React.Component {
//   constructor(props) {
//     super(props);

//     this.handleNestedChange = this.handleNestedChange.bind(this);
//   }

//   handleNestedChange() {
//     this.props.onChange();
//   }

//   render() {
//     const { formName, name, value, field, onChange, onSubmit, children, component: Component, ...props } = this.props;

//     return (
//       <Broadcasts
//         entityForm_name={formName}
//         entityForm_value={value}
//         entityForm_entity={field.entity}
//         entityForm_onChange={onChange}
//         entityForm_onSubmit={onSubmit}
//         entityForm_props={props}
//       >
//         <Component {...props}>{ children }</Component>
//       </Broadcasts>
//     );
//   }
// }

// Form.propTypes = {
//   onChange: PropTypes.func.isRequired,
// };

// Form.defaultProps = {

// };

// export default Form;
