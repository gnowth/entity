// import React from 'react';
// import { createSelector } from 'reselect';

// export default function ({ memoizers }) {
//   return ComposedComponent => class withMemoize extends React.Component {
//     constructor(props) {
//       super(props);

//       Object.entries(memoizers).forEach(([key, value]) => {
//         this[key] = value;
//       });
//     }

//     render() {
//       return (
//         <ComposedComponent {...this.props} />
//       );
//     }
//   };
// }
