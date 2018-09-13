import styled from 'styled-components';

export default styled.input.attrs({
  type: 'text',
})`
  ${props => props.theme.lib.widgets.wgText}
`;
