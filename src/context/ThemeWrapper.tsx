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
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
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
