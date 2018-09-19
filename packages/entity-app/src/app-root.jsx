import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import { AppProvider } from './context';

const AppRoot = (props) => {
  const DuckProvider = props.duckProvider || React.Fragment;
  const FormProvider = props.formProvider || React.Fragment;
  const IntlProvider = props.intlProvider || React.Fragment;
  const ThemeProvider = props.themeProvider || React.Fragment;

  return (
    <AppProvider value={props}>
      <DuckProvider {...(props.duckProviderProps || {})}>
        <FormProvider {...(props.formProviderProps || {})}>
          <IntlProvider {...(props.intlProviderProps || {})}>
            <ThemeProvider {...(props.themeProviderProps || {})}>
              { props.children }
            </ThemeProvider>
          </IntlProvider>
        </FormProvider>
      </DuckProvider>
    </AppProvider>
  );
};

AppRoot.propTypes = exact({
  children: PropTypes.node.isRequired,

  duckProvider: PropTypesPlus.isRequiredIf('duckProviderProps', PropTypesPlus.provider),
  duckProviderProps: PropTypes.exact({
    processingComponent: PropTypesPlus.isRequiredIf('processingComponentProps', PropTypesPlus.component),
    processingComponentProps: PropTypes.shape({}),
    processingDidFailComponent: PropTypesPlus.isRequiredIf('processingDidFailComponentProps', PropTypesPlus.component),
    processingDidFailComponentProps: PropTypes.shape({}),
    recordsCountComponent: PropTypesPlus.isRequiredIf('recordsCountComponentProps', PropTypesPlus.component),
    recordsCountComponentProps: PropTypes.shape({}),
    recordsCountNoneComponent: PropTypesPlus.isRequiredIf('recordsCountNoneComponentProps', PropTypesPlus.component),
    recordsCountNoneComponentProps: PropTypes.shape({}),
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
    }),
  }),

  formProvider: PropTypesPlus.isRequiredIf('formProviderProps', PropTypesPlus.provider),
  formProviderProps: PropTypes.exact({
    defaultComponents: PropTypes.object,
    defaultWidgets: PropTypes.object,
  }),

  intlProvider: PropTypesPlus.isRequiredIf('intlProviderProps', PropTypesPlus.provider),
  intlProviderProps: PropTypes.exact({
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
  }),

  themeProvider: PropTypesPlus.isRequiredIf('themeProviderProps', PropTypesPlus.provider),
  themeProviderProps: PropTypes.exact({
    theme: PropTypes.shape({}).isRequired,
  }),
});

AppRoot.defaultProps = {
  duckProvider: undefined,
  duckProviderProps: undefined,
  formProvider: undefined,
  formProviderProps: undefined,
  intlProvider: undefined,
  intlProviderProps: undefined,
  themeProvider: undefined,
  themeProviderProps: undefined,
};

export default AppRoot;
