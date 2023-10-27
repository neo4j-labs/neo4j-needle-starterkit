import { createTheme, PaletteMode, ThemeProvider, useMediaQuery } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { NeedleThemeProvider } from "@neo4j-ndl/react";

export const ThemeWrapperContext = createContext({
  toggleColorMode: () => {},
});

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');
  const [usingPreferredMode, setUsingPreferredMode] = useState<boolean>(true);
  const themeWrapperUtils = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
            setUsingPreferredMode(false);
            themeBodyInjection(prevMode);
            return prevMode === "light" ? "dark" : "light"
        });
        },
    }),
    []
  );
  const themeBodyInjection = (mode: string) => {
      if (mode === 'light') {
          document.body.classList.add('ndl-theme-dark');
      } else {
          document.body.classList.remove('ndl-theme-dark');
      }
  }
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "rgb(var(--theme-palette-primary-bg-strong))" ,
          },
        },
      }),
    [mode]
  );

  if(usingPreferredMode) {
    prefersDarkMode ? themeBodyInjection('light') : themeBodyInjection('dark');
  }

  return (
    <ThemeWrapperContext.Provider value={themeWrapperUtils}>
      <NeedleThemeProvider
        theme={mode}
        wrapperProps={{ isWrappingChildren: true }}
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </NeedleThemeProvider>
    </ThemeWrapperContext.Provider>
  );
}
