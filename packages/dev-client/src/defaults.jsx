import { useQuery, Query } from '@entity/duck-query';
import { WidgetBoolean, WidgetDate, WidgetInput, WidgetList, WidgetSelect, WidgetTextarea } from '@entity/widget';
import { withCleanTransient } from '@gnowth/style';
import { UIButton, UICard, UIErrorBoundary, UILabel, UIPopup, UIProgressCircle } from '@gnowth/ui';
import { IntlContext } from '@private/react-intl';
import { Link, NavLink, Redirect } from 'react-router-dom';

import settings from 'settings';
import store from 'store';

export default {
  settings,
  store,
  component_button: UIButton,
  component_card: UICard,
  component_errorBoundary: UIErrorBoundary,
  component_label: UILabel,
  component_link: withCleanTransient(Link),
  component_navLink: withCleanTransient(NavLink),
  component_popup: UIPopup,
  component_processing: UIProgressCircle,
  component_processingDidFail: () => 'Unable to load data. Try to refresh the page',
  component_query: Query,
  component_recordCount: ({ value }) => `${value} Record(s) Found`,
  component_recordCountNone: () => 'No Records Found',
  component_redirect: Redirect,
  context_intl: IntlContext,
  hook_useQuery: useQuery,
  uiPopup_component_overlay: UIPopup.Overlay,
  uiPopup_component_portal: UIPopup.Portal,
  widget_boolean: WidgetBoolean,
  widget_char: WidgetInput,
  widget_date: WidgetDate,
  widget_entity: WidgetSelect,
  widget_enum: WidgetSelect,
  widget_list: WidgetList,
  widget_text: WidgetTextarea,
};
