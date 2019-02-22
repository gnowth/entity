import styled from 'styled-components';
import React from 'react';
import { useDefault } from '@gnowth/default';
import { colorFromPalette } from '@gnowth/style';

const StringComponent = props => props.children;

const Component = styled.span`
  color: ${colorFromPalette()};

  ${props => props.css}
`;

const DummyContext = React.createContext({});
const mapDefault = {
  intlContext: ['uiType_context_intl', 'context_intl'],
};

export default {
  useChildren(props) {
    const { intlContext = DummyContext } = useDefault(mapDefault, props);
    const intl = React.useContext(intlContext);
    const value = props.children || props.value;

    if (value instanceof Error) {
      return value.message;
    }

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
      hidden: props.hidden,
      palette: props.palette,
      paletteAsBackground: props.paletteAsBackground,
      paletteWeight: props.paletteWeight,
    };
  },
};
