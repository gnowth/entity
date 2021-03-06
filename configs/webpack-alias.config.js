const path = require('path');

module.exports = root => ({
  root,
  apps: path.join(root, 'src/apps'),
  assets: path.join(root, 'assets'),
  components: path.join(root, 'src/components'),
  entities: path.join(root, 'src/entities'),
  forms: path.join(root, 'src/forms'),
  screens: path.join(root, 'src/screens'),
  settings: path.join(root, 'src/settings'),
  src: path.join(root, 'src'),
  store: path.join(root, 'src/store'),
  styles: path.join(root, 'src/styles'),
});
