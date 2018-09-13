// import { createSelector } from 'reselect';

// import Entity from './Entity';
// import Fields from './Field';

// const FMExample = '';
// class ExampleSubEntity extends Entity {}

// export default class ExampleEntity extends Entity {
//   static name = 'Example';

//   static fields = {
//     uuid: new Fields.UuidField(),
//     description: new Fields.IntegerField(),

//     task: new Fields.CharField({
//       valueWillChange: ({ nextValue }) => (nextValue === ':smile' ? ':)' : nextValue),
//     }),

//     sub_form: new Fields.EntityField({
//       entity: ExampleSubEntity,
//       defaultWidget: FMExample,
//       defaultWidgetProps: {
//         asFieldSet: true,
//         formName: 'defaultForm',
//       },
//     }),
//   };

//   static forms = {
//     defaultForm: {
//       fields: {
//         custom_field: {
//           widget: 'input',
//           widgetProps: {
//             aProp: 'sd',
//           },
//         },

//         multi_field: new Fields.Fields({
//           fieldNames: ['a', 'b'],
//           widgetProps: {

//           },
//         }),

//         form_filled: new Fields.ComputedField({
//           reselect: this.isFormFilled(),
//         }),
//       },

//       orderedItems: ['uuid', 'task', 'description', 'sub_form'],
//     },
//   };

//   static valueWillChange({ value, nextValue }) {
//     return nextValue.get('uuid') === '12345' && value.get('uuid') !== '12345'
//       ? nextValue.set('task', 'it is 12345')
//       : nextValue;
//   }

//   // Selectors
//   static isFormFilled() {
//     return createSelector(
//       state => state.get('uuid'),
//       state => state.get('task'),
//       state => state.get('description'),
//       (uuid, task, description) => !!(uuid && task && description),
//     );
//   }
// }
