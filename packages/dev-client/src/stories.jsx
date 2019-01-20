import centered from '@storybook/addon-centered';
import { createStoriesForWidget } from '@entity/widget';
import { createStoriesForUI } from '@gnowth/ui';
import { checkA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const storyFactory = story => chapter => storiesOf(`${story}/${chapter}`, module)
  .addDecorator(centered)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs);

createStoriesForUI(storyFactory('UI'));
createStoriesForWidget(storyFactory('Widget'));
