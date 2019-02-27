import createStoryForUIButton from './Button/Button.stories';
import createStoryForUIIcon from './Icon/Icon.stories';
import createStoryForUIImage from './Image/Image.stories';
import createStoryForUIProcessingCircle from './ProgressCircle/ProgressCircle.stories';
import createStoryForUIProcessingLine from './ProgressLine/ProgressLine.stories';
import createStoryForUIType from './Type/Type.stories';
import createStoryForUICard from './Card/Card.stories';

export { default as createStoryForUIButton } from './Button/Button.stories';
export { default as createStoryForUIIcon } from './Icon/Icon.stories';
export { default as createStoryForUIImage } from './Image/Image.stories';
export { default as createStoryForUIProcessingCircle } from './ProgressCircle/ProgressCircle.stories';
export { default as createStoryForUIProcessingLine } from './ProgressLine/ProgressLine.stories';
export { default as createStoryForUIType } from './Type/Type.stories';
export { default as createStoryForUICard } from './Card/Card.stories';

export function createStoriesForUI(storyFactory) {
  createStoryForUIButton(storyFactory('Button'));
  createStoryForUICard(storyFactory('Card'));
  createStoryForUIIcon(storyFactory('Icon'));
  createStoryForUIImage(storyFactory('Image'));
  createStoryForUIProcessingCircle(storyFactory('ProcessingCircle'));
  createStoryForUIProcessingLine(storyFactory('ProcessingLine'));
  createStoryForUIType(storyFactory('Type'));
}
