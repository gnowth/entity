import createStoryForWidgetInput from './Input/Input.stories';
import createStoryForWidgetTextarea from './Textarea/Textarea.stories';

export { default as createStoryForWidgetInput } from './Input/Input.stories';
export { default as createStoryForWidgetTextarea } from './Textarea/Textarea.stories';

export function createStoriesForWidget(storyFactory) {
  createStoryForWidgetInput(storyFactory('Input'));
  createStoryForWidgetTextarea(storyFactory('Textarea'));
}
