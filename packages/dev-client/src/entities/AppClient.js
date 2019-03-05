import { Entity } from '@entity/core';

import locales from './AppClient.locales';

class AppClient extends Entity {
  static navigations = {
    screen: [
      {
        content: locales.link_github,
        key: 'github',
        to: 'https://github.com/gnowth/react',
      },
      {
        content: locales.link_style_guide,
        key: 'styleguide',
        to: 'https://gnowth.github.io/react/style-guide',
      },
      {
        content: locales.link_observation,
        key: 'observation',
        to: '/observation',
      },
      {
        content: locales.link_changelog,
        key: 'changelog',
        to: '/pages/changelog',
      },
      {
        content: locales.link_readme,
        key: 'readme',
        to: '/pages/readme',
      },
    ],
  }
}

export default AppClient;
