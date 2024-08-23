import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import React from "react";
import "../index.css";
import NavAvatar from "@/components/nav-avatar";

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

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="h-16 bg-primary flex justify-between items-center px-2">
        <img src="/zubin.svg" className="w-16 h-16" />

        <div>
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/events" className="[&.active]:font-bold">
            Events
          </Link>
        </div>

        <NavAvatar />
      </div>

      <Outlet />

      <TanStackRouterDevtools />
    </>
  ),
});
