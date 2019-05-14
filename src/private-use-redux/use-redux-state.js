import useRedux from './use-redux';

export default mapStateToProps => useRedux(mapStateToProps).state;
