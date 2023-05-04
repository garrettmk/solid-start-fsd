import type { StorybookConfig } from "storybook-solidjs-vite";
import { PluginOption } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: true
      }
    }
  ],
  framework: {
    name: "storybook-solidjs-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  
  async viteFinal(config) {
    // Including the solid-start plugin in vite.config.ts causes storybook to crash.
    // It adds a list of plugins at the start of the config.plugins array. If we
    // remove it, storybook works fine.
    const solidStartPlugins = (config.plugins?.shift() ?? []) as PluginOption[];
    return config;
  }
};
export default config;
