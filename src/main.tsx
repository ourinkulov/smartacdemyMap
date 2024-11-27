import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./styles/index.scss";
import ErrorBoundary from "./utils/ErrorBoundary";
import "./i18n";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
);
