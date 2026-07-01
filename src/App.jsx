import { RouterProvider } from "react-router-dom";
import router from "./routes";
import ErrorBoundary from "./components/UI/ErrorBoundary";

const App = () => (
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);

export default App;
