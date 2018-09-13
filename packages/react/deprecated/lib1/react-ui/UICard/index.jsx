import React from 'react';
import PropTypes from 'prop-types';

import SDSlot from 'lib/components/std/SDSlot';

import SC from './styles';

const UICard = ({ cns, children, ...props }) => {
  const title = SDSlot({ children, name: 'title' }).filter(x => x);
  const action = SDSlot({ children, name: 'action' }).filter(x => x);

  if (process.env.NODE_ENV !== 'production') {
    const content = SDSlot({ children, name: 'content' }).filter(x => x);

    if (content.length === 0) {
      throw new Error('UICard: Must contain an element with attribute \'data-slot="content"\'');
    }
  }

  return (
    <SC.Root {...props}>
      { title.length > 0 &&
        <SC.Header className={cns.classNameHeader}>
          { title }
        </SC.Header>
      }

      <SC.Content className={cns.classNameContent}>
        <SDSlot name="content">{ children }</SDSlot>
      </SC.Content>

      { action.length > 0 &&
        <SC.Footer className={cns.classNameAction}>
          { action }
        </SC.Footer>
      }
    </SC.Root>
  );
};

UICard.propTypes = {
  cns: PropTypes.shape({
    classNameHeader: PropTypes.string,
    classNameContent: PropTypes.string,
    classNameAction: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

UICard.defaultProps = {
  cns: {},
};

export default UICard;
