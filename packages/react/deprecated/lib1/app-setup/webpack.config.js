const S3Plugin = require('webpack-s3-plugin');

const defaultCacheControl = {
  '/index\\.html$/': 'no-cache',
  '/maintenance\\.html$/': 'no-cache',
  '/favicon\\.ico$/': 'max-age=3600',
};

module.exports = {
  s3Plugin: ({ cacheControl = defaultCacheControl } = {}) => new S3Plugin({
    basePath: process.env.DEPLOY_DIRECTORY,

    s3Options: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'ap-southeast-2',
    },

    s3UploadOptions: {
      ACL: 'public-read',
      Bucket: process.env.DEPLOY_BUCKET,

      CacheControl(fileName) {
        const result = Object
          .entries(cacheControl)
          .find(([reg]) => new RegExp(reg).text(fileName));

        return result ? result[0] : 'max-age=31536000';
      },
    },
  }),
};
