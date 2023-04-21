module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            app_components: './src/components',
            app_config: './src/config',
            app_providers: './src/providers',
            app_reducers: './src/reducers',
            app_router: './src/router',
            app_services: './src/services',
            app_storage: './src/storage',
            app_utils: './src/utils',
            app_styles: './src/styles',
            assets: './src/assets',
          },
        },
      ],
      // [
      //   'react-native-reanimated/plugin',
      //   {
      //     relativeSourceLocation: true,
      //   },
      // ],
    ],
  };
};
