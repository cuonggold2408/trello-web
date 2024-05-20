import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "./theme";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Cấu hình MUI Dialog
import { ConfirmProvider } from "material-ui-confirm";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <ConfirmProvider
      defaultOptions={{
        title: "Xác nhận",
        confirmationText: "Confirm",
        cancellationText: "Cancel",
        buttonOrder: ["confirm", "cancel"],
      }}
    >
      <CssBaseline />
      <App />
      <ToastContainer theme="colored" />
    </ConfirmProvider>
  </CssVarsProvider>
  // </React.StrictMode>
);
