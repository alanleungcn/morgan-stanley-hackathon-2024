import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavAvatar() {
  return (
    <div>
      <Avatar>
        <AvatarImage src="" alt="" />
        <AvatarFallback>AA</AvatarFallback>
      </Avatar>
    </div>
  );
}
