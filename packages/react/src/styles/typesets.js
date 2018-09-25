import { css } from 'react-emotion';
import { lighten } from 'polished';

export const text = props => css`
  color: ${props.theme.vars.colorBlack};
  margin: 0;

  ${props.disabled && props.theme.mixins.disabled}
  ${props.readOnly && props.theme.mixins.readOnly}
`;

export const text_primary = props => css`
  ${text(props)}
  color: ${props.theme.vars.colorPrimary};
`;

export const text_danger = props => css`
  ${text(props)}
  color: ${props.theme.vars.colorDanger};
`;

export const text_inverted = props => css`
  ${text(props)}
  color: ${props.theme.vars.colorWhite};
`;

export const label = props => css`
  ${text(props)}
`;

export const label_portal = props => css`
  ${text(props)}
  text-transform: uppercase;
  color: ${props.theme.vars.colorGrey};
`;

export const link = props => css`
  ${text(props)}
  color: ${props.theme.vars.colorPrimary};
  text-decoration: underline;
`;

export const placeholder = props => css`
  ${text(props)}
  color: ${props.theme.vars.colorGrey};
`;

export const list = props => css`
  ${text(props)}
  cursor: pointer;
  list-style-type: none;
  padding: 7px;

  &:hover {
    color: ${lighten(0.2, props.theme.vars.colorBlack)};
  }

  ${props.selected && css`
    color: ${props.theme.vars.colorWhite};
    background-color: ${props.theme.vars.colorPrimary};

    &:hover {
      color: ${props.theme.vars.colorWhite};
      background-color: ${lighten(0.1, props.theme.vars.colorPrimary)};
    }
  `}
`;

export const section = props => css`
  margin: 0;
  padding: 20px 25px;
  color: ${props.theme.vars.colorWhite};
  background-color: ${(
    props.disabled
      ? lighten(0.4, props.theme.vars.colorBlack)
      : props.theme.vars.colorPrimary
  )};
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.6px;

  ${props.disabled && props.theme.mixins.disabled}
  ${props.readOnly && props.theme.mixins.readOnly}

  @media (max-width: 539px) {
    padding: 20px 15px;
  }
`;

export const screen_heading = props => css`
  font-family: 'Montserrat', Arial, sans-serif;
  color: ${props.theme.vars.colorSecondary};
  font-size: 36px;
  font-weight: 200;
  line-height: 30px;
  letter-spacing: 0.4px;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 30px;
  }

  @media (max-width: 539px) {
    font-size: 24px;
  }
`;

export const section_heading = props => css`
  color: ${props.theme.vars.colorWhite};
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.6px;
  margin: 0;
`;

export const table_heading = props => css`
  color: ${props.theme.vars.colorBlack};
  font-weight: bold;
  text-align: left;
  padding: 10px 5px;
  margin: 0;
`;

export const table_text = props => css`
  ${text(props)}
  padding: 10px 5px;
`;

export const inspection_heading = props => css`
  color: ${props.theme.vars.colorWhite};
  background-color: ${props.theme.vars.colorSecondary};
  text-transform: uppercase;
  padding: 20px 25px;
  font-size: 18px;
  margin: 0;
`;

export const header_action = props => css`
  font-size: 18px;
  font-weight: bold;

  ${props.disabled && props.theme.mixins.disabled}
  ${props.readOnly && props.theme.mixins.readOnly}
`;

export const header_inverted = css`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin: 0;
`;

export const answers_heading = props => css`
  color: ${props.theme.vars.colorBlack};
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;
