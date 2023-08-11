module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@contexts': './src/contexts',
          '@hooks': './src/hooks',
          '@navigations': './src/navigations',
          '@features': './src/features',
          '@helpers': './src/helpers',
          '@stores': './src/stores',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
