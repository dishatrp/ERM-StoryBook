import React from 'react';

// import {addons} from '@storybook/preview-api'
// import {DARK_MODE_EVENT_NAME} from 'storybook-dark-mode'
import { useDarkMode } from 'storybook-dark-mode';  
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

import { theme } from '../src/styles/globals';

// function ColorSchemeWrapper({
//   children,
// }:{
//   children: React.ReactNode;
// }) {
//   const { } = useMantineColorScheme();
//   const handleColorScheme = (value: boolean) => setColorScheme(value? 'dark': 'light');
  
  
// }

function ThemeWrapper(props: { children: React.ReactNode }) {
  const colorScheme = useDarkMode() ? 'dark' : 'light';
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={() => {}}>
      <MantineProvider theme={{...theme, colorScheme}} withGlobalStyles withNormalizeCSS>
      {props.children}
    </MantineProvider>
    </ColorSchemeProvider>
  );
}

// enhance your stories with decorator that uses ThemeWrapper
export const decorators = [(renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>];

