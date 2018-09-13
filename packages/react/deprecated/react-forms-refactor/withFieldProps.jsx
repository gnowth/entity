// import zipObject from 'lodash/zipObject';
// import pick from 'lodash/fp/pick';
// import React from 'react';
// import PropTypes from 'prop-types';
// import PropTypesImmutable from 'react-immutable-proptypes';
// import { Map } from 'immutable';
// import { createSelector } from 'reselect';

// import { flow } from 'lib/context-binds';
// import { withSubscribers } from 'lib/react-broadcasts';
// import { PropTypesEntity } from 'lib/react-entities';

// export default () => (ComposedComponent) => {
//   class withFieldProps extends React.Component {
//     constructor(props) {
//       super(props);

//       this.handleChange = this.handleChange.bind(this);
//       this.genProps = this.genProps.bind(this);
//     }

//     // Note(thierry): that fieldNames value cannot be dynamic. TODO: are either have an error check or make it dynamic
//     valueSelector = createSelector(
//       record => record.get(this.props.name),
//       ...(this.props.fieldNames?.map(name => record => record.get(name)) || []),
//       (nameValue, ...fieldNameValues) => (
//         this.props.fieldNames
//           ? Map(zipObject(this.props.fieldNames, fieldNameValues))
//           : nameValue
//       ),
//     );

//     genProps() {
//       const { formName, name, fieldNames, selector, validators, component, broadcastRecord, broadcastOnChange, broadcastFormName, broadcastFormProps, broadcastFormField, ...props } = this.props;
//       const componentFormName = formName || broadcastFormName;
//       const componentFieldNames = fieldNames || broadcastFormField?.entity.forms[componentFormName]?.fields[name]?.fieldNames;
//       const fields = broadcastFormField?.entity.fields::flow(
//         pick(componentFieldNames || [name]),
//       );

//       // TODO: use selector to convert to immutable so that no new immutable is created each time
//       const fieldProps = Map(props).filterNot(
//         (_, key) => ['value', 'record', 'onChange', 'field'].includes(key),
//       );

//       return {
//         component,
//         name,
//         fields,
//         fieldProps,
//         fieldNames: componentFieldNames,
//         value: this.valueSelector(broadcastRecord, { name, fieldNames: componentFieldNames }),
//         record: broadcastRecord,
//         selector: selector || fields?.[name]?.selector,
//         validators: validators || fields?.[name]?.validators,
//         formName: componentFormName,
//         formField: broadcastFormField,
//         formProps: broadcastFormProps,
//       };
//     }

//     handleChange({ target: { name, value } }) {
//       const props = this.genProps();

//       if (name) {
//         const field = this.broadcastFormfield?.entity.fields[name];
//         const nextValue = field?.valueWillChange({
//           nextValue: value,
//           value: props.record.get(name),
//           record: props.record,
//           fieldProps: props.fieldProps,
//           formProps: props.formProps,
//         });

//         return props.onChange({
//           target: {
//             name,
//             value: field ? nextValue : value,
//           },
//         });
//       }

//       if (process.env.NODE_ENV !== 'production') {
//         if (!Map.isMap(value)) {
//           throw new Error(`react-forms: ${props.name} - If no name is provided in the onChange, the value should be an Immutable Map!`);
//         }
//       }

//       const nextMultiValue = value.map((val, key) => {
//         const field = this.broadcastFormfield?.entity.fields[key];
//         const nextValue = field?.valueWillChange({
//           nextValue: val,
//           value: props.record.get(key),
//           record: props.record,
//           fieldProps: props.fieldProps,
//           formProps: props.formProps,
//         });

//         return field ? nextValue : val;
//       });

//       return props.onChange({ target: { name, value: nextMultiValue } });
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
//     broadcastRecord: PropTypesImmutable.map.isRequired,
//     broadcastOnChange: PropTypes.func.isRequired,
//     broadcastFormName: PropTypes.string,
//     broadcastFormField: PropTypesEntity.field,
//     broadcastFormProps: PropTypesImmutable.map.isRequired,

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
//     broadcastFormName: '',
//     broadcastFormField: null,

//     formName: '',
//     fieldNames: null,
//     validators: null,
//     component: null,
//     selector: null,
//   };

//   return withSubscribers([
//     'broadcastRecord',
//     'broadcastOnChange',
//     'broadcastFormName',
//     'broadcastFormField',
//     'broadcastFormProps',
//   ]);
// };
