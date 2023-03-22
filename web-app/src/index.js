import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import theme from "./styles/js/mantineTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
