module.exports = {
  configureWebpack: { devtool: "source-map" },
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      preload: "src/utilities/preload.ts",
    },
  },
};
