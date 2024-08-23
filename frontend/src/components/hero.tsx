import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const Hero = () => {
  return (
    <section
      className="grid lg:grid-cols-2 pt-16 gap-10
            bg-cover
            bg-[url('/banner.png')]
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
      <div className="text-center lg:text-start space-y-6 px-24">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#FDF14E] to-[#E4D402] text-transparent bg-clip-text">
              Zubin Foundation
            </span>
          </h1>
          <br />
          <h2 className="inline text-white">Events Management Portal</h2>
          {/* <img src="/banner.png" /> */}
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0 text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
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

          {/* <a
            rel="noreferrer noopener"
            href="https://github.com/leoMirandaa/shadcn-landing-page.git"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
          </a> */}
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">{/* <HeroCards /> */}</div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
