import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';
import { component } from '@gnowth/style';

export const Wrapper = styled.div`
  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker__input-container {
    display: block;
  }

  ${component({ name: 'widgetDate', branch: 'root' })}
  ${props => props.css}
`;

export const DatePicker = styled(ReactDatePicker)`
  display: block;
  width: 100%;

  ${component({ name: 'widgetDate', branch: 'input' })}
  ${props => props.css}
`;
