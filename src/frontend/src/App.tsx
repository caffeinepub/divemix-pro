import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import CalculatorPage from "./pages/CalculatorPage";
import GasGuidePage from "./pages/GasGuidePage";
import HomePage from "./pages/HomePage";
import TanksPage from "./pages/TanksPage";

function RootLayout() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("divemix-dark");
    return stored !== null ? stored === "true" : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("divemix-dark", String(darkMode));
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const calculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator",
  component: CalculatorPage,
});
const tanksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tanks",
  component: TanksPage,
});
const gasGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gas-guide",
  component: GasGuidePage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  calculatorRoute,
  tanksRoute,
  gasGuideRoute,
  aboutRoute,
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
