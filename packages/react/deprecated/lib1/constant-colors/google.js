/** Dark text on light background
 * Primary text: 87% opacity,
 * Secondary text: 54% opacity,
 * Disabled / Hint text: 38% opacity,
 * Dividers: 12% opacity
 */

/** White text on dark background
 * Primary text: 100% opacity,
 * Secondary text: 70% opacity,
 * Disabled / Hint text: 50% opacity,
 * Dividers: 12% opacity,
 */

/** Dark icons
 * Active: 54% opacity,
 * Inactive: 38% opacity,
 */

/** Light icons
 * Active: 100% opacity,
 * Inactive: 50% opacity,
 */

/** Light Theme
 * Grey 300: Status bar,
 * Grey 100: App bar,
 * Grey 50: Background,
 * White: Cards / Dialogs,
 */

/** Dark Theme
 * Black: Status bar,
 * Grey 900: Appbar,
 * #303030: Background,
 * Grey 800: Cards / Dialogs,
 */

/** Color Theme example
 * Primary color: Indigo(100, 500, 700),
 * Secondary color1: Pink(A100, A200, A400),
 * Secondary color2: Blue Grey(300, 700, 900),
 */

import red from './google-red';
import pink from './google-pink';
import purple from './google-purple';
import deepPurple from './google-deep-purple';
import indigo from './google-indigo';
import blue from './google-blue';
import lightBlue from './google-light-blue';
import cyan from './google-cyan';
import teal from './google-teal';
import green from './google-green';
import lightGreen from './google-light-green';
import lime from './google-lime';
import yellow from './google-yellow';
import amber from './google-amber';
import orange from './google-orange';
import deepOrange from './google-deep-orange';
import brown from './google-brown';
import grey from './google-grey';
import blueGrey from './google-blue-grey';

export const black = '#000000';
export const white = '#ffffff';

export { default as red } from './google-red';
export { contrast as redContrast } from './google-red';

export { default as pink } from './google-pink';
export { contrast as pinkContrast } from './google-pink';

export { default as purple } from './google-purple';
export { contrast as purpleContrast } from './google-purple';

export { default as deepPurple } from './google-deep-purple';
export { contrast as deepPurpleContrast } from './google-deep-purple';

export { default as indigo } from './google-indigo';
export { contrast as indigoContrast } from './google-indigo';

export { default as blue } from './google-blue';
export { contrast as blueContrast } from './google-blue';

export { default as lightBlue } from './google-light-blue';
export { contrast as lightBlueContrast } from './google-light-blue';

export { default as cyan } from './google-cyan';
export { contrast as cyanContrast } from './google-cyan';

export { default as teal } from './google-teal';
export { contrast as tealContrast } from './google-teal';

export { default as green } from './google-green';
export { contrast as greenContrast } from './google-green';

export { default as lightGreen } from './google-light-green';
export { contrast as lightGreenContrast } from './google-light-green';

export { default as lime } from './google-lime';
export { contrast as limeContrast } from './google-lime';

export { default as yellow } from './google-yellow';
export { contrast as yellowContrast } from './google-yellow';

export { default as amber } from './google-amber';
export { contrast as amberContrast } from './google-amber';

export { default as orange } from './google-orange';
export { contrast as orangeContrast } from './google-orange';

export { default as deepOrange } from './google-deep-orange';
export { contrast as deepOrangeContrast } from './google-deep-orange';

export { default as brown } from './google-brown';
export { contrast as brownContrast } from './google-brown';

export { default as grey } from './google-grey';
export { contrast as greyContrast } from './google-grey';

export { default as blueGrey } from './google-blue-grey';
export { contrast as blueGreyContrast } from './google-blue-grey';

export default {
  ...red,
  ...pink,
  ...purple,
  ...deepPurple,
  ...indigo,
  ...blue,
  ...lightBlue,
  ...cyan,
  ...teal,
  ...green,
  ...lightGreen,
  ...lime,
  ...yellow,
  ...amber,
  ...orange,
  ...deepOrange,
  ...brown,
  ...grey,
  ...blueGrey,
  white,
  black,
};
