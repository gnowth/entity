import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';

export const Wrapper = styled.div`
  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker__input-container {
    display: block;
  }

  ${props => props.theme.components?.widgetDate?.[props.variant || 'main']?.root}
  ${props => props.css}
`;

export const DatePicker = styled(ReactDatePicker)`
  display: block;
  width: 100%;

  ${props => props.theme.components?.widgetDate?.[props.variant || 'main']?.input}
  ${props => props.css}
`;
