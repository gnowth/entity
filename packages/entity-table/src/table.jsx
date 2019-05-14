import _ from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';

import { Provider } from './base';

const TableRoot = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

function Table(props) {
  const CustomHeaderRowComponent = props.customHeaderRowComponent;
  const HeaderComponent = props.headerComponent;
  const HeaderWrapperComponent = props.headerWrapperComponent;
  const HeaderRowComponent = props.headerRowComponent;
  const RowComponent = props.rowComponent;

  return (
    <TableRoot className={props.className}>
      <colgroup>
        { React.Children.map(props.children, child => (
          <col width={child.props.width} />
        ))}
      </colgroup>

      <thead>
        { !CustomHeaderRowComponent && (
          <HeaderRowComponent>
            { React.Children.map(props.children, child => !child.props.hidden && (
              <HeaderComponent {...props.headerComponentProps}>
                { HeaderWrapperComponent && (
                  <HeaderWrapperComponent>
                    { child.props.label }
                  </HeaderWrapperComponent>
                )}

                { !HeaderWrapperComponent && child.props.label }
              </HeaderComponent>
            ))}
          </HeaderRowComponent>
        )}

        { CustomHeaderRowComponent && (
          <CustomHeaderRowComponent {...props.customHeaderRowComponentProps} />
        )}
      </thead>

      <tbody>
        { props.value.map(record => (
          <RowComponent
            key={props.field.entity.getId(record)}
            {...(
              _.isFunction(props.rowComponentProps)
                ? props.rowComponentProps({
                  name: props.name,
                  value: record,
                  field: props.field,
                })
                : props.rowComponentProps
            )}
          >
            <Provider
              value={{
                name: props.name,
                value: record,
                field: props.field,
              }}
            >
              { props.children }
            </Provider>
          </RowComponent>
        ))}
      </tbody>
    </TableRoot>
  );
}

Table.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  value: PropTypesImmutable.list.isRequired,
  field: PropTypesEntity.entityField.isRequired,
  customHeaderRowComponentProps: PropTypes.shape({}),
  customHeaderRowComponent: PropTypesPlus.component,
  headerRowComponentProps: PropTypes.shape({}),
  headerRowComponent: PropTypesPlus.component,
  headerComponentProps: PropTypes.shape({}),
  headerComponent: PropTypesPlus.component,
  headerWrapperComponent: PropTypesPlus.component,
  rowComponentProps: PropTypesPlus.componentProps,
  rowComponent: PropTypesPlus.component,
};

Table.defaultProps = {
  headerComponentProps: {},
  headerComponent: 'th',
  headerRowComponentProps: {},
  headerRowComponent: 'tr',
  headerWrapperComponent: undefined,
  rowComponent: 'tr',
  rowComponentProps: {},
  customHeaderRowComponent: undefined,
  customHeaderRowComponentProps: {},
};

export default Table;
