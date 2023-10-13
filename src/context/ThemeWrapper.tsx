import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
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
  const [mode, setMode] = useState<PaletteMode>("light");
  const themeWrapperUtils = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
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
