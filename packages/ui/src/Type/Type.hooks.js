import _omitBy from 'lodash/omitBy';
import styled, { css } from 'styled-components';
import React from 'react';
import { useDefault } from '@gnowth/default';
import { color, colorFromPalette } from '@gnowth/style';

const StringComponent = props => props.children;

const Component = styled.span`
  ${props => props.palette && css`
    color: ${colorFromPalette()};
  `}

  ${props => props.margin && css`
    margin: ${props.margin};
  `}

  ${props => props.padding && css`
    padding: ${props.padding};
  `}

  ${props => !props.mediaPrintDisabled && css`
    @media print {
      color: ${color({ name: 'black' })}
    }
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
    return _omitBy({
      ...props,
      children: undefined,
      hooks: undefined,
      locales: undefined,
      names: undefined,
      styles: undefined,
      theme: undefined,
    }, (value, key) => /^\$\$/.test(key));
  },
};
