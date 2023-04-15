import * as Pages from "@src/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{
  path: '/',
  element: <Pages.Home />,
}, {
  path: '/result',
  element: <Pages.Result />,
}]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
