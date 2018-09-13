// import React from 'react';
// import PropTypes from 'prop-types';
// import PropTypesImmutable from 'react-immutable-proptypes';

// import withFieldProps from './withFieldProps';

// class Fields extends React.Component {
//   constructor(props) {
//     super(props);

//     this.genWidgetProps = this.genWidgetProps.bind(this);
//     this.genWidget = this.genWidget.bind(this);
//   }

//   genWidget() {
//     return this.props.component
//       || this.props.formField?.entity.getWidget({
//         formName: this.props.formName,
//         fieldName: this.props.name,
//         value: this.props.value,
//         record: this.props.record,
//         fieldProps: this.props.fieldProps,
//         formProps: this.genWidgetprops.formProps,
//       });
//   }

//   genWidgetProps() {
//     return Object.assign(
//       {},
//       this.props.fieldProps,
//     );
//   }

//   render() {
//     const Widget = this.genWidget();

//     return <Widget {...this.genWidgetProps()} />;
//   }
// }

// Fields.propTypes = {
//   name: PropTypes.string.isRequired,
//   value: PropTypes.any,
//   record: PropTypesImmutable.map.isRequired,
//   onChange: PropTypes.func.isRequired,
//   fields: PropTypes.object,
//   fieldProps: PropTypesImmutable.map.isRequired,
//   formName: PropTypes.string,
//   formField: PropTypes.object,
//   component: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.string,
//   ]).isRequired,
// };

// Fields.defaultProps = {
//   fields: null,
//   formName: '',
// };

// export default withFieldProps()(Fields);
