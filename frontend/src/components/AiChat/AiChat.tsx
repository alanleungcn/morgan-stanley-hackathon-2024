import * as Popover from "@radix-ui/react-popover";
import { AiChat, useAsStreamAdapter } from "@nlux/react";
import { send } from "./send";
import { personas } from "./personas";

import "@nlux/themes/nova.css";

import "./theme-variables.css";

export default function NavAvatar() {
  const adapter = useAsStreamAdapter(send, []);
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className="fixed bottom-4 right-4 cursor-pointer">
          <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <svg
              className="h-9 w-9 text-black-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          <div className="fixed bottom-[-5px] right-4 w-[300px] border-black border-2 border-solid rounded-[20px] h-[400px]">
            {/* Dummy container content can be added here */}
            <AiChat
              displayOptions={{
                // themeId: "MyBrandName",
                colorScheme: "light",
              }}
              personaOptions={personas}
              adapter={adapter}
            />
          </div>
          <Popover.Close className="PopoverClose" aria-label="Close">
            {/* <div className="flex top-0 left-0">X</div> */}
          </Popover.Close>
          {/* <Popover.Arrow className="PopoverArrow" /> */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
