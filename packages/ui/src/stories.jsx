import uiButton from './Button/stories';
import uiProcessingCircle from './ProgressCircle/stories';
import uiProcessingLine from './ProgressLine/stories';
import uiTypeSet from './TypeSet/stories';
import uiWell from './Well/stories';

export default (mod) => {
  uiButton(mod);
  uiProcessingCircle(mod);
  uiProcessingLine(mod);
  uiTypeSet(mod);
  uiWell(mod);
};
