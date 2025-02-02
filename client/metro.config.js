// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = withNativeWind(
  (() => {
    const config = getDefaultConfig(__dirname);

    config.transformer = {
      ...config.transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    };

    config.resolver = {
      ...config.resolver,
      assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"), // Remove 'svg' from assetExts
      sourceExts: [...config.resolver.sourceExts, "svg"], // Add 'svg' to sourceExts
    };

    return config;
  })(),
  { input: "./global.css" }
);
