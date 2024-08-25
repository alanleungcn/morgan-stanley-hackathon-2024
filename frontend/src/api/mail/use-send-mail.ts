import { apiClient } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

interface SendMail {
  body: string;
  subject: string;
  recipients: {
    email: string;
  }[];
}

export function useSendMail() {
  return useMutation({
    mutationFn: async (payload: SendMail) => {
      const res = await apiClient.post("/send_mail", payload);
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Email sent successfully",
      });
    },
  });
}
