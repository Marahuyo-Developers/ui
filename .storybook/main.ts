import type { StorybookConfig } from 'storybook-react-rsbuild'
import { dirname, join } from 'node:path'
import { pluginReact } from '@rsbuild/plugin-react';
import tailwindcss from '@tailwindcss/postcss';

const config: StorybookConfig = {
  framework: {
    name: 'storybook-react-rsbuild',
    options: {},
  },
  rsbuildFinal: (config) => {
    return {
      plugins:[pluginReact()],
      tools: {
        postcss: {
          postcssOptions: {
            plugins: [tailwindcss],
          },
        },
      },
    }
  },
  stories:['../stories/**/*.mdx','../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  docs: {
    defaultName: 'Docs',
    docsMode: false,
    autodocs: false,
  },
  typescript: {
    reactDocgen: 'react-docgen',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: () => true,
    },
    check: true,
  },
}

export default config