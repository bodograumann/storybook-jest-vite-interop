module.exports = {
  features: { buildStoriesJson: true },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
  ],
  framework: "@storybook/vue3",
  core: {
    builder: "storybook-builder-vite",
  },
  async viteFinal(config, { configType }) {
    // For interactions addon with vite and improve load times
    // https://github.com/eirslett/storybook-builder-vite/issues/186#issuecomment-1001064670
    if (configType !== "PRODUCTION") {
      config.optimizeDeps ??= { include: [] };
      config.optimizeDeps.include.push(
        // Optional, but prevents error flashing in the Storybook component preview iframe:
        // Fix: failed to fetch dynamically import module, avoid cache miss for dependencies on the first load
        "@storybook/addon-docs/blocks",
        "@storybook/components",
        "@storybook/jest",
        "@storybook/store",
        "@vue/reactivity",
      );
    }
    return config;
  },
};
