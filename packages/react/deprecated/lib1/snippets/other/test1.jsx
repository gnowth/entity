// import React from 'react';

// import { Form, Fields, FieldComputed } from 'lib/react-forms';
// import { Entity } from 'lib/react-entities';
// import { EnumField, ComputedField } from 'lib/react-entities/fields';

// const TestPage = ({ name, value, entity }) => (
//   <Form name={name} value={value} >
//     <Fields name="specField" />
//     <FieldComputed name="computed_field" />
//   </Form>
// );

// const PackEntity = new Entity({
//   fields: {
//     enum_field: new EnumField({
//       messageIdBase: 'BaseCoachingFields.standardChoices',
//       options: [],
//     }),

//     computed_field: new ComputedField({
//       predicate: ({ record, predicates }) => record.get('test'),
//       widgetProps: {

//       },
//     }),
//   },

//   selectors: {

//   }

//   computed: {
//     is_visible: ({ record, methods }) => record.get('has_item'),
//   },


//   forms: {
//     formA: {
//       fields: {
//         non_field: {
//           widget: 'input',
//           fieldNames: ['enum_field', 'uuid_field'],
//         },
//       },
//     },
//   },
// });
