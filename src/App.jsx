import * as Pages from "@src/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{
  path: '/',
  element: <Pages.Home />,
}, {
  path: '/offers',
  element: <Pages.Home />,
}, {
  path: '/hotel/:id/offers',
  element: <Pages.HotelOffers />,
}]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
