import styled from 'styled-components';
import React from 'react';
import { FormattedMessage } from 'react-intl';

// TODO add ability to use raw text, id, and locale;
export default styled.span.attrs({
  children: props => props.children || (
    <FormattedMessage
      id={props.id}
      description={props.description}
      defaultMessage={props.defaultMessage}
      values={props.values}
    />
  ),
})`
  ${(props) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!props.theme.typesets[props.name]) throw new Error(`TypeSet: name "${props.name}" must be a value in props.theme.typesets`);
    }

    return props.theme.typesets[props.name];
  }}
`;
