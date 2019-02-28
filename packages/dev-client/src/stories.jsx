import centered from '@storybook/addon-centered';
import { createStoriesForTheme } from '@gnowth/style';
import { createStoriesForUI } from '@gnowth/ui';
import { createStoriesForWidget } from '@entity/widget';
import { checkA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const storyFactory = story => chapter => storiesOf(`${story}/${chapter}`, module)
  .addDecorator(centered)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs);

createStoriesForTheme(storyFactory('Theme'));
createStoriesForUI(storyFactory('UI'));
createStoriesForWidget(storyFactory('Widget'));
