import createStoryForUIButton from './Button/Button.stories';
import createStoryForUIIcon from './Icon/Icon.stories';
import createStoryForUIImage from './Image/Image.stories';
import createStoryForUIProcessingCircle from './ProgressCircle/ProgressCircle.stories';
import createStoryForUIProcessingLine from './ProgressLine/ProgressLine.stories';
import createStoryForUITypeSet from './TypeSet/TypeSet.stories';
import createStoryForUIWell from './Well/Well.stories';

export { default as createStoryForUIButton } from './Button/Button.stories';
export { default as createStoryForUIIcon } from './Icon/Icon.stories';
export { default as createStoryForUIImage } from './Image/Image.stories';
export { default as createStoryForUIProcessingCircle } from './ProgressCircle/ProgressCircle.stories';
export { default as createStoryForUIProcessingLine } from './ProgressLine/ProgressLine.stories';
export { default as createStoryForUITypeSet } from './TypeSet/TypeSet.stories';
export { default as createStoryForUIWell } from './Well/Well.stories';

export function createStoriesForUI(storyFactory) {
  createStoryForUIButton(storyFactory('Button'));
  createStoryForUIIcon(storyFactory('Icon'));
  createStoryForUIImage(storyFactory('Image'));
  createStoryForUIProcessingCircle(storyFactory('ProcessingCircle'));
  createStoryForUIProcessingLine(storyFactory('ProcessingLine'));
  createStoryForUITypeSet(storyFactory('TypeSet'));
  createStoryForUIWell(storyFactory('Well'));
}
