module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      preload: "src/utilities/preload.ts",
    },
  },
};
