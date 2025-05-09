// components/Providers.tsx
"use client";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import SessionWrapper from "@/components/SessionWrapper";
import store from "../../store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionWrapper>
      <Provider store={store}>
        {children}
      </Provider>
      <ToastContainer />
    </SessionWrapper>
  );
}
