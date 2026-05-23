import React from "react";
import { useAuth } from "./features/auth/hooks/useAuth";
import Home from "./features/interview/pages/Home";
import Protected from "./features/auth/components/Protected";
import Landing from "./features/landing/Landing";

const RootRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <main><h1>Loading...</h1></main>;

  return user ? (
    <Protected>
      <Home />
    </Protected>
  ) : (
    <Landing />
  );
};

export default RootRoute;
