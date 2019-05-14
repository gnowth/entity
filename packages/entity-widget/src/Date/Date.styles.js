import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';
import { component } from '@burnsred/theme';

export const Wrapper = styled.div`
  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker__input-container {
    display: block;
  }

  ${component({ namespace: 'component_widgetDate', branch: 'root' })}
  ${props => props.css}
`;

export const DatePicker = styled(ReactDatePicker)`
  display: block;
  width: 100%;

  ${component({ namespace: 'component_widgetDate', branch: 'input' })}
  ${props => props.css}
`;
