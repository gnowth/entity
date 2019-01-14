import uiButton from './Button/Button.stories';
import uiIcon from './Icon/Icon.stories';
import uiImage from './Image/Image.stories';
import uiProcessingCircle from './ProgressCircle/ProgressCircle.stories';
import uiProcessingLine from './ProgressLine/ProgressLine.stories';
import uiTypeSet from './TypeSet/TypeSet.stories';
import uiWell from './Well/Well.stories';

export default (mod) => {
  uiButton(mod);
  uiIcon(mod);
  uiImage(mod);
  uiProcessingCircle(mod);
  uiProcessingLine(mod);
  uiTypeSet(mod);
  uiWell(mod);
};
