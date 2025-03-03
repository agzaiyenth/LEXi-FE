const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Fix Metro bundler waiting issue
config.resolver = config.resolver || {};
config.resolver.blockList = [/\/android\/.*/]; // Prevent infinite looping in Android folder

// Ensure SVGs are processed correctly
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

module.exports = withNativeWind(config, { input: "./global.css" });
