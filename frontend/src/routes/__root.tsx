import AiChat from "@/components/AiChat/AiChat";
import MobileNav from "@/components/mobile-nav";
import { Nav } from "@/components/nav";
import NavUser from "@/components/nav-user";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import "../index.css";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : React.lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    );

const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-expect-error Property 'toggleDevtools' does not exist on type 'Window & typeof globalThis'.ts(2339)
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-16 items-center justify-between bg-primary">
        <Link to="/" className="ml-4 hidden h-16 w-16 flex-shrink-0 sm:block">
          <img src="/zubin.svg" className="h-16 w-16" />
        </Link>

        <div className="block sm:hidden">
          <MobileNav
            open={isSidebarOpen}
            setOpen={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <Link to="/" className="ml-4 block h-16 w-16 flex-shrink-0 sm:hidden">
          <img src="/zubin.svg" className="h-16 w-16" />
        </Link>

        <Nav />

        <NavUser />
      </div>

      <Outlet />

      <Toaster />

      <AiChat />

      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen />
          <TanStackRouterDevtools />
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
}
