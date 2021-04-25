module.exports = {
  configureWebpack: { devtool: "source-map" },
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
};
