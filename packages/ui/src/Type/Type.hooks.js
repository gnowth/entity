import styled, { css } from 'styled-components';
import React from 'react';
import { useDefault } from '@gnowth/default';
import { color, colorFromPalette, media, mixin, useCleanProps } from '@gnowth/style';

const local = [
  'onChangeInput',
];

const StringComponent = props => props.children;

const Component = styled.span`
  ${props => props.$palette && css`
    color: ${colorFromPalette()};
  `}

  ${mixin({ name: 'margin' })}
  ${mixin({ name: 'padding' })}

  ${media.print`
    color: ${color({ palette: 'black' })}
  `}

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

    if (props.hidden) {
      return null;
    }

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
    return props.as === null
      ? StringComponent
      : Component;
  },

  useProps(props) {
    return useCleanProps(props, { local });
  },
};
