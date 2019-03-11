import styled from 'styled-components';
import { mixin } from '@gnowth/style';

export default styled.div`
  flex: ${props => (props.flex === undefined ? 1 : props.flex)};

  ${mixin({ name: 'margin' })}
  ${mixin({ name: 'padding' })}
`;
