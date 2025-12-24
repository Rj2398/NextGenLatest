const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// Create custom resolver configuration
const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, // Changed to true for better performance
      },
    }),
  },
  resolver: {
    assetExts: [
      ...assetExts.filter(ext => ext !== 'svg'), // Remove SVG from asset extensions
      'png',
      'jpg',
      'jpeg',
      'webp',
      'gif',
      'bmp',
      'tiff',
    ],
    sourceExts: [
      ...sourceExts,
      'svg',
      'cjs', // For CommonJS modules in node_modules
      'mjs', // For ES modules
    ],
    resolverMainFields: ['react-native', 'browser', 'main'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
