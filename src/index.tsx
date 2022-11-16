import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import AppProvider from "./Context/AppProvider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const container = document.getElementById("root")!;
const root = createRoot(container);
const queryClient = new QueryClient();
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
      </AppProvider>
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
