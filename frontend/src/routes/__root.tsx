import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import React, { useEffect, useState } from "react";
import { useEffect } from "react";
import "../index.css";
import { Toaster } from "@/components/ui/toaster";
import NavUser from "@/components/nav-user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AiChat from "@/components/AiChat/AiChat";

// const TanStackRouterDevtools = import.meta.env.PROD
//   ? () => null // Render nothing in production
//   : React.lazy(() =>
//       // Lazy load in development
//       import("@tanstack/router-devtools").then((res) => ({
//         default: res.TanStackRouterDevtools,
//         // For Embedded Mode
//         // default: res.TanStackRouterDevtoolsPanel
//       })),
//     );

const queryClient = new QueryClient();

// const ReactQueryDevtoolsProduction = React.lazy(() =>
//   import("@tanstack/react-query-devtools/build/modern/production.js").then(
//     (d) => ({
//       default: d.ReactQueryDevtools,
//     }),
//   ),
// );

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  // const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-expect-error Property 'toggleDevtools' does not exist on type 'Window & typeof globalThis'.ts(2339)
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-16 bg-primary flex justify-between items-center px-6">
        <img src="/zubin.svg" className="w-16 h-16" />

        <div className="flex justify-start w-full gap-8 mx-16">
          <Link to="/" className="[&.active]:underline">
            Home
          </Link>
          <Link to="/events" className="[&.active]:underline">
            Events
          </Link>
          <Link to="/trainings" className="[&.active]:underline">
            Trainings
          </Link>
          <Link to="/admin" className="[&.active]:underline">
            Admin Portal
          </Link>
          <Link to="/leaderboard" className="[&.active]:underline">
            Leaderboard
          </Link>
        </div>

        <NavUser />
      </div>

      <Outlet />

      <Toaster />
      <AiChat />
      {/* <TanStackRouterDevtools  />
      <ReactQueryDevtools initialIsOpen />
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )} */}
    </QueryClientProvider>
  );
}
