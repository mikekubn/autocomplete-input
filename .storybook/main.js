module.exports = {
  "core": {
     builder: "webpack5"
  },
  "stories": [
     "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
     "@storybook/addon-links",
     "@storybook/addon-essentials"
  ],
  "framework": "@storybook/react",
  typescript: {
     check: false,
     checkOptions: {},
     reactDocgen: false,
     reactDocgenTypescriptOptions: {
        shouldExtractLiteralValuesFromEnum: true,
        propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
     },
  },
}