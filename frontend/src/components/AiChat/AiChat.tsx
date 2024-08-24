import { AiChat, useAsStreamAdapter } from "@nlux/react";
import "@nlux/themes/nova.css";
import { MessageSquareText } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { personas } from "./personas";
import { send } from "./send";
import "./theme-variables.css";

export default function NavAvatar() {
  const adapter = useAsStreamAdapter(send, []);
  return (
    <Popover>
      <PopoverTrigger className="fixed bottom-4 right-4">
        <Button size="icon" className="h-12 w-12 rounded-full">
          <MessageSquareText />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={8}
        collisionPadding={8}
        className="w-9/10 h-96 max-w-96"
      >
        <AiChat
          displayOptions={{
            colorScheme: "light",
          }}
          personaOptions={personas}
          adapter={adapter}
        />
      </PopoverContent>
    </Popover>
  );
}
