import styled from 'styled-components';
import React from 'react';
import { UITypeSet } from '@gnowth/ui';

import locale from './locale';

const Screen = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const AppNotFound = () => (
  <Screen>
    <UITypeSet locale={locale.not_found} variant="header" />
  </Screen>
);

export default AppNotFound;
