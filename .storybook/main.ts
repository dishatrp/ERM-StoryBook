import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // Add this line only if you are not using Vite
    '@storybook/addon-styling-webpack',
    'storybook-dark-mode',
    "@chromatic-com/storybook",
    '@storybook/addon-a11y',
    '@storybook/addon-coverage'
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
    defaultName: 'Documentation',
  },
  staticDirs: ["..\\public"],
};
export default config;
