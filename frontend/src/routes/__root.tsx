import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import React from "react";
import "../index.css";
import NavAvatar from "@/components/nav-avatar";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";

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
          <Link to="/admin/manage-events" className="[&.active]:underline">
            Manage Events
          </Link>
        </div>

        <div className="flex gap-2">
          <Button>Login</Button>
          <Button>Register</Button>
          <NavAvatar />
        </div>
      </div>

      <Outlet />

      <Toaster />

      <TanStackRouterDevtools />
    </>
  ),
});
