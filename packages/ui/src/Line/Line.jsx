import styled from 'styled-components';
import { colorFromPalette } from '@gnowth/style';

export default styled.hr`
  border: 0;
  border-bottom: 1px ${props => props.borderStyle || 'solid'} ${colorFromPalette()};
`;
