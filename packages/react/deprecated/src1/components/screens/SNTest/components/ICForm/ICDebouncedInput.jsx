import styled from 'styled-components';
import withHandleChangeDebounced from 'lib/react-hoc/withHandleChangeDebounced';

const ICDebouncedInput = styled.input([]);

export default withHandleChangeDebounced()(ICDebouncedInput);
