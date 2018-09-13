// import React from 'react';

// const s = {};
// const Specification = () => ({});

// class d extends Specification {
//   fields = {
//     spec: new Field(),
//   }
// }

// const specification = new Specification({
//   fields: {
//     spec_field_name: {
//       entityFieldNames: ['spec_field_name'], // optional
//       valueWillChange() {
//         // this = instance of what?
//       },
//       validators: [

//       ],
//       widgetProps: {
//         hidden: true,
//       },
//     },

//     spec_field_name2: {
//       entityFieldNames: ['spec_field_name', 'spec_field_name2'],
//       validators: () => [],
//       widgetProps: ({ record }) => ({
//         className: s.whatever,
//         hidden: record.get('some_field'),
//       }),
//     },
//   },

//   valueWillChange({ nextValue }) {
//     // this = instance of form?
//     return nextValue;
//   },
// });

// const Sample = () => (
//   <Form specification={specification}>
//     <Field name="spec_field_name" />
//     <Fields name="spec_field_name2" />
//     <FieldComputed name="spec_field_name3" />
//   </Form>
// );
