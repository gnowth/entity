const path = require('path');

module.exports = root => ({
  root,
  apps: path.join(root, 'src/apps/'),
  assets: path.join(root, 'assets/'),
  components: path.join(root, 'src/components/'),
  settings: path.join(root, 'src/settings.config'),
  src: path.join(root, 'src/'),
  store: path.join(root, 'src/store'),
  styles: path.join(root, 'src/styles'),
});
