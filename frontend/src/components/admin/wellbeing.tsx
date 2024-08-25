import { useSendMail } from "@/api/mail/use-send-mail";
import { useUsers } from "@/api/user/use-users";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Mail, Phone } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";

export const Wellbeing = () => {
  const { data: users, isSuccess } = useUsers();
  const { mutate: sendMail } = useSendMail();
  return (
    <div className="flex justify-center">
      <div className="flex w-full flex-col gap-5 p-8">
        <h1 className="text-4xl font-bold">Wellbeing</h1>

        <div className="flex flex-col gap-2">
          {isSuccess &&
            users.map(
              (user) =>
                !user.isAdmin && (
                  <div
                    className="flex items-center gap-4 rounded-md p-4 shadow"
                    key={user.userId}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatarUrl} alt="" />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>

                    <div className="w-32 text-ellipsis">{user.name}</div>

                    <div className="ml-auto space-x-4">
                      <Button className="ml-auto" size="icon" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>

                      <Button
                        className="ml-auto"
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          sendMail({
                            subject: "Wellbeing Health Check",
                            body: "Please fill out this form to check in on your wellbeing",
                            recipients: [
                              {
                                email: user.email,
                              },
                            ],
                          })
                        }
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ),
            )}
        </div>
      </div>
    </div>
  );
};
