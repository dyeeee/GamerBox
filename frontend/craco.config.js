const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A',
            '@layout-header-background': '#1d365d' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

