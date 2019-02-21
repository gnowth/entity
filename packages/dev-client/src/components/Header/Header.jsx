import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useDefaultStyle } from '@gnowth/style';
import { UIBox, UIButton } from '@gnowth/ui';

import defaultLocales from './Header.locales';
import defaultStyles from './Header.styles';

function Header(props) {
  const locales = { ...defaultLocales, ...props.locales };
  const styles = useDefaultStyle(defaultStyles, props.styles);

  return (
    <UIBox css={styles.header} justifyContent="flex-start">
      <UIButton
        content={locales.github}
        to="https://github.com/gnowth/react"
        variant="text"
      />

      <UIButton
        content={locales.style_guide}
        to="https://gnowth.github.io/react/style-guide"
        variant="text"
      />

      <UIButton
        content={locales.changelog}
        to="/pages/changelog"
        variant="text"
      />

      <UIButton
        content={locales.readme}
        to="/pages/readme"
        variant="text"
      />
    </UIBox>
  );
}

Header.propTypes = {
  locales: PropTypes.exact({
    changelog: PropTypesPlus.locale.isRequired,
    github: PropTypesPlus.locale.isRequired,
    readme: PropTypesPlus.locale.isRequired,
    style_guide: PropTypesPlus.locale.isRequired,
  }),
  styles: PropTypes.exact({
    header: PropTypesPlus.css,
  }),
};

Header.defaultProps = {
  locales: undefined,
  styles: undefined,
};

export default React.memo(Header);
