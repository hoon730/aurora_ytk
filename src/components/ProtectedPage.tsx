import React from "react";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { authenticate } from "../atom";

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const authState = useRecoilValue(authenticate);

  if (!authState.isAuthenticated) {
    return <Navigate to="/pre-loading" />;
  }

  return <>{children}</>;
};

export default ProtectedPage;
