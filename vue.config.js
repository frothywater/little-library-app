module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "development") {
      config.devtool = "source-map";
    }
  },
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "com.frothywater.littlelibrary",
        productName: "Little Library",
      },
      chainWebpackMainProcess: (config) => {
        config.devtool("eval"); // Important! Webpack minimizer will crash 'mysqljs'
      },
    },
  },
};
