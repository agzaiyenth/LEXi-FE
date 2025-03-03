// metro.config.js
const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Get the default Expo config
const config = getDefaultConfig(__dirname);

// If not already defined, define resolver
config.resolver = config.resolver || {};

// 1) Block the android directory (prevents scanning)
const exclusionList = require("metro-config/src/defaults/exclusionList");
config.resolver.blockList = exclusionList([
  // This regex will block anything inside /android/.
  /\/android\/.*/,
]);

// 2) Ensure handling of .svg files if you're using `react-native-svg-transformer`:
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

// 3) If using NativeWind:
module.exports = withNativeWind(config, { input: "./global.css" });
