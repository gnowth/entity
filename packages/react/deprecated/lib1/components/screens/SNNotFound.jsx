import React from 'react';
import { FormattedMessage } from 'react-intl';

const SNNotFound = ({ className }) => (
  <div className={className}>
    <FormattedMessage id="app.pageNotFound" />
  </div>
);

export default SNNotFound;
