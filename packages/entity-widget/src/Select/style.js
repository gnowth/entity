import styled, { css } from 'styled-components';
import Select from 'react-select';
import { UIIcon } from '@gnowth/ui';

// TODO chech what to do with css
// import 'react-select/dist/react-select.css';

export const Root = styled(Select)`
  text-align: left;
  background-color: white;

  .Select-arrow-zone.Select-arrow-zone {
    padding-right: 0;
    vertical-align: top;
  }

  &.is-disabled .Select-arrow-zone.Select-arrow-zone {
    opacity: 1;
  }

  .Select-control.Select-control {
    ${props => props.theme.mixins.componentBox}
    background-color: white;
    height: ${props => (props.field.many ? '65px' : '34px')};
    padding: 0;

    ${props => props.disabled && props.theme.mixins.disabled}
    ${props => props.readOnly && props.theme.mixins.readOnly}
  }
`;

export const Icon = styled(UIIcon)`
  ${props => !props.field.many && css`
    box-sizing: border-box;
    width: 34px;
    height: 34px;
    background-color: ${props.theme.vars.colorSecondary};
    color: white;

    && {
      line-height: 34px;
    }
  `}

  ${props => props.field.many && css`
    margin: 20px 20px 0 0;

    && {
      font-size: 20px;
    }
  `}
`;
