import React from 'react';
import { FormattedMessage } from 'react-intl';

import UIIconFontAwesome from 'lib/react-ui/UIIconFontAwesome';
import loc from './locale';

const SNMain = ({ className }) => (
  <div className={className}>
    <UIIconFontAwesome name="bars" />
    <FormattedMessage id={loc.pageNotFound} />
  </div>
);

export default SNMain;
