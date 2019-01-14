import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { UIBox, UIButton } from '@gnowth/ui';

import locales from './locales';
import styles from './styles';

const Header = props => (
  <UIBox css={props.styles.header} justifyContent="flex-start">
    <UIButton
      css={props.styles.buttons}
      locale={props.locales.github}
      to="https://github.com/gnowth/react"
      variant="text"
    />

    <UIButton
      css={props.styles.buttons}
      locale={props.locales.style_guide}
      to="https://gnowth.github.io/react/style-guide"
      variant="text"
    />

    <UIButton
      css={props.styles.buttons}
      locale={props.locales.changelog}
      to="/pages/changelog"
      variant="text"
    />

    <UIButton
      css={props.styles.buttons}
      locale={props.locales.readme}
      to="/pages/readme"
      variant="text"
    />
  </UIBox>
);

Header.propTypes = {
  locales: PropTypes.exact({
    changelog: PropTypesPlus.locale.isRequired,
    github: PropTypesPlus.locale.isRequired,
    readme: PropTypesPlus.locale.isRequired,
    style_guide: PropTypesPlus.locale.isRequired,
  }),
  styles: PropTypes.exact({
    buttons: PropTypesPlus.css,
    header: PropTypesPlus.css,
  }),
};

Header.defaultProps = {
  locales,
  styles,
};

export default Header;
