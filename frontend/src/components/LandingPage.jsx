import React from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Cover } from "./ui/cover";
import { ChevronRight } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";

export default function BackgroundLinesDemo() {
  const navigate = useNavigate();

  const routehome = () => {
    navigate("/login");
  };

  return (
    <BackgroundLines className="dark:bg-black bg-white relative flex items-center justify-center w-full flex-col px-4">
      <div className="absolute top-7 right-7">
        <ModeToggle />
      </div>
      
      <p className=""></p>
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Your Future Awaits <br /><span className="spancolor"> Apply Now!</span>
      </h2>
      <p className="mx-auto  md:text-lg text-[#767676] text-base">
        Explore endless opportunities and apply for your dream job now!
      </p>
      <div className="relative z-30 mt-4">
        <div className="">
          <Cover className="flex">
            <Button
              className="!border-none !bg-transparent p-2 !shadow-none text-white text-2xl pointer"
              onClick={routehome}
            >
              Let's Go
            </Button>{" "}
            <div className="text-white pt-[0.6rem]">
              <ChevronRight />
            </div>
          </Cover>
        </div>
      </div>
    </BackgroundLines>
  );
}
