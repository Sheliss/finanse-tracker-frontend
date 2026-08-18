import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";
import { Providers } from "./app/providers.tsx";
import { AuthProvider } from "./features/auth/components/AuthProvider.tsx";
import { ThemeInitializer } from "./components/ThemeInitializer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <AuthProvider>
        <ThemeInitializer />
        <RouterProvider router={router} />
      </AuthProvider>
    </Providers>
  </StrictMode>,
);
