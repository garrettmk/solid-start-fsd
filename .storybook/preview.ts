import type { Preview } from 'storybook';
import { withThemeByClassName } from "@storybook/addon-styling";
import "../src/app/ui/root.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "",
      dark: "dark"
    },
    defaultTheme: "light",
  }),
];