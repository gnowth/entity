import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { UIFlexBox, UIButton } from '@gnowth/ui';
import { useEnhance } from '@private/hooks';

import locales from './Header.locales';
import styles from './Header.styles';

function Header(props) {
  const enhancedProps = useEnhance(props, { locales, styles });

  return (
    <UIFlexBox {...enhancedProps} css={enhancedProps.styles.header} justifyContent="flex-start">
      <UIButton
        content={enhancedProps.locales.github}
        to="https://github.com/gnowth/react"
        variant="text"
      />

      <UIButton
        content={enhancedProps.locales.style_guide}
        to="https://gnowth.github.io/react/style-guide"
        variant="text"
      />

      <UIButton
        content={enhancedProps.locales.changelog}
        to="/pages/changelog"
        variant="text"
      />

      <UIButton
        content={enhancedProps.locales.readme}
        to="/pages/readme"
        variant="text"
      />
    </UIFlexBox>
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
