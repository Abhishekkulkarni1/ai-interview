import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Interview from "./features/interview/pages/Interview";
import Protected from "./features/auth/components/Protected";
import RootRoute from "./RootRoute";
import RootLayout from "./RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <RootRoute /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "interview/:interviewId",
        element: (
          <Protected>
            <Interview />
          </Protected>
        ),
      },
    ],
  },
]);
