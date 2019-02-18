import styled from 'styled-components';
import React from 'react';
import { useDefault } from '@gnowth/default';
import { color } from '@gnowth/style';

const StringComponent = props => props.children;

const Component = styled.span`
  color: ${props => color({
    asBackground: props.paletteAsBackground,
    name: props.palette || 'black',
    weight: props.paletteWeight,
  })(props)};
  ${props => props.css}
`;

const DummyContext = React.createContext({});
const mapDefault = {
  intlContext: ['uiType_context_intl', 'context_intl'],
};

export default {
  useChildren(props) {
    const { intlContext } = useDefault(mapDefault, props);
    const intl = React.useContext(intlContext || DummyContext);
    const value = props.children || props.value;

    if (props.field) {
      return props.field.toString(value);
    }

    if (intl && value?.id) {
      return intl.formatMessage(value, props.values);
    }

    return value;
  },

  useComponent(props) {
    return props.component === null
      ? StringComponent
      : Component;
  },

  usePropsComponent(props) {
    return {
      ...props.componentProps,
      as: props.component,
      className: props.className,
      css: props.css,
      palette: props.palette,
      paletteAsBackground: props.paletteAsBackground,
      paletteWeight: props.paletteWeight,
    };
  },
};
