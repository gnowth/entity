import uiButton from './Button/stories';
import uiImage from './Image/stories';
import uiProcessingCircle from './ProgressCircle/stories';
import uiProcessingLine from './ProgressLine/stories';
import uiTypeSet from './TypeSet/stories';
import uiWell from './Well/stories';

export default (mod) => {
  uiButton(mod);
  uiImage(mod);
  uiProcessingCircle(mod);
  uiProcessingLine(mod);
  uiTypeSet(mod);
  uiWell(mod);
};
