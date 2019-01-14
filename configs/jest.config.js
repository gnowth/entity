module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/configs/jest.file.mock.js',
    '\\.(css|less)$': '<rootDir>/configs/jest.style.mock.js',
  },

  resolver: 'jest-webpack-resolver',

  rootDir: process.cwd(),
};
