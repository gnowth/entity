import { fromJS } from 'immutable';

export default error => fromJS(error.data);
