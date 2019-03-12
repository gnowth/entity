import createStoryForColors from './colors.stories';

export { default as createStoryForColors } from './colors.stories';

export function createStoriesForTheme(storyFactory) {
  createStoryForColors(storyFactory('colors'));
}
