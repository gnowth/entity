import styled, { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export class TypeSet extends React.Component {
  constructor(props) {
    super(props);
    // const { name, theme, intlProps, ...cssProps } = props;
    // todo: allow override of theme.typeset.component
    // todo throw error if typeset does not exist

    const typeset = props.theme.lib.typesets[props.name];

    if (process.env.NODE_ENV !== 'production') {
      if (!typeset) {
        throw new Error(`TypeSet: theme.typeset does not contain styles for ${props.name}`);
      }
    }

    const component = this.props.component || (Array.isArray(typeset) ? 'p' : typeset.component);

    // convert cssProps to css => maybe bad idea, let
    this.Component = styled[component]`
      ${Array.isArray(typeset) ? typeset : typeset.css}
    `;
  }

  // TODO: maybe extend?

  componentWillReceiveProps(nextProps) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.component !== nextProps.component) {
        throw new Error('TypeSet: does not support dynamic "component" props');
      }
    }
  }

  render() {
    return (
      <this.Component className={this.props.className}>
        <this.props.intlComponent {...this.props.intlProps} />
      </this.Component>
    );
  }
}

TypeSet.propTypes = {
  theme: PropTypes.shape({
    lib: PropTypes.shape({
      typesets: PropTypes.object.isRequired,
    }),
  }).isRequired,

  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),

  intlComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  intlProps: PropTypes.shape({}).isRequired,
};

TypeSet.defaultProps = {
  component: null,
  intlComponent: FormattedMessage,
};

export default withTheme(TypeSet);
