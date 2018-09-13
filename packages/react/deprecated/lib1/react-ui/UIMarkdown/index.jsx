import cn from 'classnames';
import marked from 'marked';
import React from 'react';
import PropTypes from 'prop-types';

import 'github-markdown-css/github-markdown.css';

const UIMarkdown = ({ className, source }) => (
  <div
    className={cn('markdown-body', className)}
    dangerouslySetInnerHTML={{ __html: marked(source) }} // eslint-disable-line react/no-danger
  />
);

UIMarkdown.propTypes = {
  source: PropTypes.string.isRequired,
};

export default UIMarkdown;
