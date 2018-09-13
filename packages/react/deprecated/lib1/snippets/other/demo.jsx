// import React from 'react';

// import { List } from 'immutable';

// import { AEntity, BEntity } from './entity';
// import FormA from './form/FormA';

// class Demo extends React.Component {
//   state = {
//     test: AEntity.dataToRecord({
//       formB: BEntity.dataToRecord({}),
//       formBs: List([
//         BEntity.dataToRecord({}),
//         BEntity.dataToRecord({}),
//       ]),
//     }),
//   };

//   handleChange = ({ target: { name, value } }) => (
//     this.setState({ [name]: value })
//   );

//   render() {
//     return (
//       <div>
//         <FormA
//           name="test"
//           value={this.state.test}
//           onChange={this.handleChange}
//         />
//       </div>
//     );
//   }
// }

// export default Demo;
