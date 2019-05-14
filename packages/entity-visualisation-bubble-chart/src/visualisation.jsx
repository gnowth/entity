import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import React from 'react';
import { Visualisation } from '@burnsred/entity-visualisation';
import { color } from '@burnsred/theme';
import { UIPortal } from '@burnsred/ui';

import hooks from './visualisation.hooks';
import styles from './visualisation.styles';

function VisualisationBubbleChart(props) {
  const [hover, setHover] = React.useState(null);
  hooks.useClearHoverOnScroll(setHover);

  return (
    <Visualisation
      entity={props.entity}
      getData={hooks.useGetData(props)}
      onNodeEnter={hooks.useHandleNodeEnter(props)}
      onNodeUpdate={hooks.useHandleNodeUpdate(props, { setHover })}
      onUnmount={hooks.useHandleUnmount(props)}
      select="circle"
    >
      { hover && (
        <UIPortal
          {...hooks.usePropsPortal(props, hover)}
          css={styles.bubble_tooltip}
          $padding="1rem"
        >
          { props.render(props, hover) }
        </UIPortal>
      )}
    </Visualisation>
  );
}

/* eslint-disable react/no-unused-prop-types */
VisualisationBubbleChart.propTypes = {
  entity: PropTypesEntity.entity.isRequired,
  getSize: PropTypes.func,
  height: PropTypes.number,
  margin: PropTypes.number,
  padding: PropTypes.number,
  render: PropTypes.func, // TODO: use tooltipComponentInstead
  width: PropTypes.number,
};
/* eslint-enable react/no-unused-prop-types */

VisualisationBubbleChart.defaultProps = {
  getSize: ({ entity, value }) => entity.getSize(value),
  height: undefined,
  margin: 40,
  padding: 10,
  render: (props, hover) => props.entity.toString(hover.d.data),
  width: undefined,
};

// HACK(thierry): the className will be added to every node. and withComponent might get deprecated
export default styled(VisualisationBubbleChart)`
  fill: ${color({ palette: 'secondary' })};

  &:hover {
    fill: ${color({ palette: 'primary' })};
  }
`;
