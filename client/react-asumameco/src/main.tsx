import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/provider/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement || document.createElement("div"));

root.render(
  <Router>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </Router>
);
