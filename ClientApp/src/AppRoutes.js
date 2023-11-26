import { Home } from "./components/Home";
import { Customer } from "./components/Customer";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/firma',
    element: <Customer />
  }
];

export default AppRoutes;
