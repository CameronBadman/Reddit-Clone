const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      fallback: {
        "url": require.resolve("url/"),
        "stream": require.resolve("stream-browserify"),
        "querystring": require.resolve("querystring-es3")
      }
    },
  },
  transpileDependencies: [
    'quasar'
  ],
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
};
