import React, { createContext, useMemo, useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: "light" });

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1976d2" : "#90caf9",
          },
          secondary: {
            main: mode === "light" ? "#7f53ac" : "#ce93d8",
          },
          background: {
            default: mode === "light" ? "#f5f7fa" : "#181a1b",
            paper: mode === "light" ? "#fff" : "#23272f",
          },
        },
        shape: { borderRadius: 12 },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
