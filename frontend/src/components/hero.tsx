import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const Hero = () => {
  return (
    <section
      className="grid lg:grid-cols-2 py-12 sm:py-16 gap-10
            bg-cover
            bg-[url('/hero.png')]
            relative
            z-10
            before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:bg-gradient-to-r
            before:from-black
            before:to-white
            before:opacity-80
            before:z-[-5]
    "
    >
      <div className="px-8 lg:px-16 text-start space-y-6">
        <main className="text-4xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#E4D402] to-[#FDF14E] text-transparent bg-clip-text">
              The Zubin Foundation
            </span>
          </h1>
        </main>

        <p className="text-lg text-white">Together, We Drive Changes</p>

        <Link
          to="/events"
          className={cn(
            "w-full md:w-1/3 gap-2",
            buttonVariants({ variant: "default", size: "lg" }),
          )}
        >
          Browse Events
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};
