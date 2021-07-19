module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}