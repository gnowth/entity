const entityReq = require.context('.', true, /\.js$/);

entityReq.keys()
  .filter(key => key !== './index.js')
  .forEach((key) => {
    const name = key.replace(/^\.\/(.*)\.js$/, '$1');
    module.exports[name] = entityReq(key).default;
  });
