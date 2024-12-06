import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { CustomerProvider } from "./context/customerContext";

// const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <QueryClientProvider client={queryClient}>
  <CustomerProvider>
         <Router>

    <App />
    </Router>
  </CustomerProvider>

  // </QueryClientProvider>,
);
