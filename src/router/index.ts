import { createBrowserRouter } from "react-router-dom";
import Singup from "../components/signup";
import signin from "../components/signin";
import Home from "../components/home";
import Main from "../components/main"

export const router = createBrowserRouter([
    {
      path: "/",
      Component: Main,
      children: [
        {
          path: "home",
          Component: Home,
        },
        {
          path: "signup",
          Component: Singup,
        },
        {
          path: "signin",
          Component: signin,
        },
      ]
    },
    
]);