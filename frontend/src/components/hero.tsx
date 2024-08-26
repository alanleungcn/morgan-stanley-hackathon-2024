import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";

export const Hero = () => {
  return (
    <section className="relative z-10 grid gap-10 bg-[url('/hero.png')] bg-cover py-12 before:absolute before:inset-0 before:z-[-5] before:block before:bg-gradient-to-r before:from-black before:to-white before:opacity-80 before:content-[''] sm:py-16 xl:grid-cols-[60%_1fr]">
      <div className="space-y-6 px-8 text-start lg:px-24">
        <main className="text-4xl font-bold md:text-6xl">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#E4D402] to-[#FDF14E] bg-clip-text text-transparent">
              The Zubin Foundation -
              <br />
              <span className="inline bg-gradient-to-r from-[#81D2F5] to-[#8BC43F] bg-clip-text text-transparent">
                CarEvent
              </span>
            </span>
          </h1>
        </main>

        <p className="text-lg text-white">Together, We Drive Changes</p>

        <Link
          to="/events"
          className={cn(
            "w-full gap-2",
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
