import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "./assets/css/jquery.dataTables.css";
import App from "./App";
import { MantineProvider, Text } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new QueryClient();
root.render(
  <>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <UserContextProvider>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </UserContextProvider>
    </MantineProvider>
  </>
);
