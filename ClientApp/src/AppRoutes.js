import { Home } from "./components/Home";
import { Customer } from "./components/customer/Customer";
import  Detail  from "./components/customer/Detail";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/firma',
    element: <Customer />
  },
  {
    path: '/firma/detail/:id',
    element: <Detail />
  }
];

export default AppRoutes;
