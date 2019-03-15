import centered from '@storybook/addon-centered';
import { createStoriesForTheme } from '@gnowth/theme';
import { createStoriesForUI } from '@gnowth/ui';
import { createStoryForVisualisationBubbleChart } from '@entity/visualisation-bubble-chart';
import { createStoryForVisualisationPieChart } from '@entity/visualisation-pie-chart';
import { createStoriesForWidget } from '@entity/widget';
import { checkA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const storyFactory = story => chapter => storiesOf(`${story}/${chapter}`, module)
  .addDecorator(centered)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs);

createStoryForVisualisationBubbleChart(storyFactory('Visualisation')('BubbleChart'));
createStoryForVisualisationPieChart(storyFactory('Visualisation')('PieChart'));
createStoriesForTheme(storyFactory('Theme'));
createStoriesForUI(storyFactory('UI'));
createStoriesForWidget(storyFactory('Widget'));
