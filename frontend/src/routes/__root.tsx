import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import React, { useEffect, useState } from "react";
import NavUser from "@/components/nav-user";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "../index.css";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AiChat from "@/components/AiChat/AiChat";
import MobileNav from "@/components/mobile-nav";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

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

        <div className="ml-8 hidden w-full justify-start gap-2 sm:flex">
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
