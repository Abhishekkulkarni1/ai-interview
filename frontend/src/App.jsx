import { RouterProvider } from "react-router";
import { router } from "./appRouter.jsx";
import { AuthProvider } from "./features/auth/authContext.jsx";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
