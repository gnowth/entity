// import pick from 'lodash/fp/pick';
// import React from 'react';
// import PropTypes from 'prop-types';
// import PropTypesImmutable from 'react-immutable-proptypes';
// import { Map } from 'immutable';

// import { flow } from 'lib/context-binds';
// import { withSubscribers } from 'lib/react-broadcasts';
// import { PropTypesEntity } from 'lib/react-entities';

// export default (ComposedComponent) => {
//   class withFieldProps extends React.Component {
//     constructor(props) {
//       super(props);

//       this.handleChange = this.handleChange.bind(this);
//       this.genProps = this.genProps.bind(this);
//     }

//     genProps() {
//       const { formName, name, fieldNames, selector, validators, component, entityFormName, entityFormRecord, entityFormOnChange, entityFormEntity, entityFormProps, ...props } = this.props;
//       const componentFormName = formName || entityFormName;
//       const componentFieldNames = entityFormEntity.forms[componentFormName]?.fields[name]?.fieldNames;
//       const fields = entityFormEntity.fields ::flow(
//         pick(componentFieldNames || [name]),
//       );

//       // TODO: use selector to convert to immutable so that no new immutable is created each time
//       const fieldProps = Map(props).filterNot(
//         (_, key) => ['fieldNames', 'value', 'record', 'onChange', 'field', 'entity'].includes(key),
//       );

//       return {
//         component,
//         name,
//         fields,
//         fieldProps,
//         fieldNames: componentFieldNames,
//         record: entityFormrecord,
//         selector: selector || fields ?.[name] ?.selector,
//         validators: validators || fields ?.[name] ?.validators,
//         formName: componentFormName,
//         formField: broadcastFormField,
//         formProps: broadcastFormProps,
//       };
//     }

//     handleChange({ target: { name, value: nextValue } }) {
//       if (process.env.NODE_ENV !== 'production') {
//         if (!name && !Map.isMap(nextValue)) {
//           throw new Error(`react-forms: ${this.props.name} - If no name is provided in the onChange, the value should be an Immutable Map!`);
//         }
//       }

//       const props = this.genProps();

//       const value = name
//         ? props.field.valueWillChange({
//           nextValue,
//           value: props.record.get(name),
//           record: props.record,
//           fieldProps: props.fieldProps,
//           formProps: props.formProps,
//         })
//         : nextValue.map((val, key) => props.fields[key].valueWillChange({
//           nextValue: val,
//           value: props.record.get(key),
//           record: props.record,
//           fieldProps: props.fieldProps,
//           formProps: props.formProps,
//         }));

//       return props.onChange({ target: { name, value } });
//     }

//     render() {
//       return (
//         <ComposedComponent
//           {...this.genProps()}
//           onChange={this.handleChange}
//         />
//       );
//     }
//   }

//   withFieldProps.propTypes = {
//     entityFormName: PropTypes.string,
//     entityFormRecord: PropTypesImmutable.map.isRequired,
//     entityFormOnChange: PropTypes.func.isRequired,
//     entityFormEntity: PropTypesEntity.field.isRequired,
//     entityFormProps: PropTypesImmutable.map.isRequired,

//     formName: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     fieldNames: PropTypes.arrayOf(PropTypes.string),
//     selector: PropTypes.func,
//     validators: PropTypes.array,
//     component: PropTypes.oneOfType([
//       PropTypes.func,
//       PropTypes.string,
//     ]),
//   };

//   withFieldProps.defaultProps = {
//     entityFormName: '',

//     formName: '',
//     fieldNames: null,
//     validators: null,
//     component: null,
//     selector: null,
//   };

//   return withSubscribers([
//     'entityFormname',
//     'entityFormrecord',
//     'entityFormonChange',
//     'entityFormentity',
//     'entityFormprops',
//   ])(withFieldProps);
// };
