import styled from 'styled-components';

import UIMarkdown from 'lib/react-ui/UIMarkdown';
import changelog from 'assets/md/CHANGELOG.md';

const SNChangeLog = styled(UIMarkdown).attrs({ source: changelog })`
  margin: 1rem;
`;

export default SNChangeLog;
