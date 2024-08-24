import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import "../index.css";
import { Toaster } from "@/components/ui/toaster";
import NavUser from "@/components/nav-user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AiChat from "@/components/AiChat/AiChat";
import MobileNav from "@/components/mobile-nav";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-16 bg-primary flex justify-between items-center">
        <Link to="/" className="hidden sm:block w-16 h-16 ml-4 flex-shrink-0">
          <img src="/zubin.svg" className="w-16 h-16" />
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

        <Link to="/" className="block sm:hidden w-16 h-16 ml-4 flex-shrink-0">
          <img src="/zubin.svg" className="w-16 h-16" />
        </Link>

        <div className="hidden justify-start w-full gap-2 sm:flex ml-8">
          <Link
            to="/"
            className={cn(buttonVariants({ variant: "link" }), "text-black")}
          >
            Home
          </Link>
          <Link
            to="/events"
            className={cn(buttonVariants({ variant: "link" }), "text-black")}
          >
            Events
          </Link>
          <Link
            to="/trainings"
            className={cn(buttonVariants({ variant: "link" }), "text-black")}
          >
            Trainings
          </Link>
          <Link
            to="/leaderboard"
            className={cn(buttonVariants({ variant: "link" }), "text-black")}
          >
            Leaderboard
          </Link>
          <Link
            to="/admin"
            className={cn(buttonVariants({ variant: "link" }), "text-black")}
          >
            Admin Portal
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
