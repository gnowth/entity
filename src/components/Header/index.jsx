import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { UIBox, UIButton } from '@gnowth/ui';

import locale from './locale';
import styles from './styles';

const Header = props => (
  <UIBox css={styles.header} justifyContent="flex-start">
    <UIButton
      css={styles.buttons}
      locale={props.locale.github}
      to="https://github.com/gnowth/react"
      variant="text"
    />

    <UIButton
      css={styles.buttons}
      locale={props.locale.style_guide}
      to="https://gnowth.github.io/react/style-guide"
      variant="text"
    />

    <UIButton
      css={styles.buttons}
      locale={props.locale.changelog}
      to="/pages/changelog"
      variant="text"
    />

    <UIButton
      css={styles.buttons}
      locale={props.locale.readme}
      to="/pages/readme"
      variant="text"
    />
  </UIBox>
);

Header.propTypes = {
  locale: PropTypes.exact({
    changelog: PropTypesPlus.locale.isRequired,
    github: PropTypesPlus.locale.isRequired,
    readme: PropTypesPlus.locale.isRequired,
    style_guide: PropTypesPlus.locale.isRequired,
  }),
};

Header.defaultProps = {
  locale,
};

export default Header;
