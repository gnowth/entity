import styled from 'styled-components';
import { colorFromPalette, withEnhanceProps } from '@gnowth/style';

export default withEnhanceProps(styled.hr`
  border: 0;
  border-bottom: 1px ${props => props.borderStyle || 'solid'} ${colorFromPalette()};
`);
