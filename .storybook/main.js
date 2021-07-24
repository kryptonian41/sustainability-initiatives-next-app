const path = require("path");
const svgDirPath = path.resolve(__dirname, "../assets/svgs");
module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-css-modules-preset",
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    const rules = config.module.rules;
    rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });

    const svgAssetRule = rules.find(({ test }) => {
      if (test) return test.test(".svg");
      return false;
    });

    if (svgAssetRule) svgAssetRule.exclude = svgDirPath;

    rules.push({
      test: /\.svg$/,
      include: svgDirPath,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
